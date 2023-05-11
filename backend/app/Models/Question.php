<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class Question extends Model
{
    use HasFactory, SoftDeletes;

    const OPEN = 0;

    const CLOSED = 1;

    const DUPLICATE = 2;

    protected $guarded = [];

    protected $with = ['answers'];

    protected $appends = ['vote_count', 'upvote_percentage',
        'humanized_created_at', 'is_from_user', 'user_vote', 'is_answered'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($question) {
            $slug = Str::slug($question->title);

            $latestQuestion = Question::orderBy('created_at', 'DESC')->first();
            $duplicateCount = Question::where('title', $question->title)->count();
            $lastQuestionId = $latestQuestion ? $latestQuestion->id + 1 : 1;

            $question->slug = $duplicateCount === 0 ? $slug : "$slug-duplicate-$lastQuestionId";
        });

        static::updating(function ($question) {
            $slug = Str::slug($question->title);

            $questionFirst = Question::where('title', $question->title)->first();
            $duplicateCount = Question::where('title', $question->title)->count();

            if ($questionFirst?->id !== $question->id) {
                $question->slug = $duplicateCount === 0 ? $slug : "$slug-duplicate-$question->id";
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function votes()
    {
        return $this->morphMany(Vote::class, 'voteable');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function getVoteCountAttribute()
    {
        return $this->votes()->sum('value');
    }

    public function getUpvotePercentageAttribute()
    {
        $totalVotes = $this->votes()->count();
        if ($totalVotes) {
            return ($this->votes()->where('value', 1)->sum('value') / $totalVotes) * 100;
        }

        return 0;
    }

    public function getUserVoteAttribute()
    {
        return $this->votes()->where('user_id', auth()->id())->first()->value ?? 0;
    }

    public function getHumanizedCreatedAtAttribute()
    {
        return $this->created_at->diffForHumans();
    }

    public function bookmarks()
    {
        return $this->morphMany(Bookmark::class, 'bookmarkable');
    }

    public function getIsFromUserAttribute()
    {
        if (auth()->user()) {
            return $this->user_id === auth()->user()->id;
        } else {
            return false;
        }
    }

    public function getIsAnsweredAttribute()
    {
        return $this->answers()->where('is_correct', 1)->exists();
    }

    public function getIsBookmarkedAttribute()
    {
        return $this->bookmarks()->where('user_id', Auth::id())->exists();
    }

    public function deleteNotification($notifiableIds, $type)
    {
        UserNotification::where('notifiable_type', $type)->whereIn('notifiable_id', $notifiableIds)->delete();
    }

    public function deleteQuestionRelations()
    {
        $this->bookmarks()->delete();

        $this->deleteNotification($this->votes->pluck('id'), 'App\Models\Vote');
        $this->votes()->delete();

        $this->deleteNotification($this->comments->pluck('id'), 'App\Models\Comment');
        $this->comments()->delete();

        $this->answers->each(function ($answer) {
            $answer->bookmarks()->delete();

            $this->deleteNotification($answer->votes->pluck('id'), 'App\Models\Vote');
            $answer->comments()->delete();

            $this->deleteNotification($answer->comments->pluck('id'), 'App\Models\Comment');
            $answer->comments()->delete();
        });

        $this->deleteNotification($this->answers->pluck('id'), 'App\Models\Answer');
        $this->answers()->delete();
    }
}
