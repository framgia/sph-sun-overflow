<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Answer extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = ['vote_count', 'humanized_created_at', 'is_created_by_user',
        'user_vote', 'is_from_user', 'upvote_percentage'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function votes()
    {
        return $this->morphMany(Vote::class, 'voteable');
    }

    public function notifications()
    {
        return $this->morphMany(UserNotification::class, 'notifiable');
    }

    public function bookmarks()
    {
        return $this->morphMany(Bookmark::class, 'bookmarkable');
    }

    public function getVoteCountAttribute()
    {
        return $this->votes()->sum('value');
    }

    public function getUserVoteAttribute()
    {
        return $this->votes()->where('user_id', auth()->id())->first()->value ?? 0;
    }

    public function getHumanizedCreatedAtAttribute()
    {
        return $this->created_at->diffForHumans();
    }

    public function getIsFromUserAttribute()
    {
        if (auth()->user()) {
            return $this->user_id === auth()->user()->id;
        } else {
            return false;
        }
    }

    public function getUpvotePercentageAttribute()
    {
        $totalVotes = $this->votes()->count();
        if ($totalVotes) {
            return ($this->votes()->where('value', 1)->sum('value') / $totalVotes) * 100;
        }

        return 0;
    }

    public function getIsCreatedByUserAttribute()
    {
        if (auth()->user()) {
            return auth()->user()->answers()->where('id', $this->id)->exists();
        } else {
            return false;
        }
    }

    public function getIsBookmarkedAttribute()
    {
        return $this->bookmarks()->where('user_id', Auth::id())->exists();
    }

    public function deleteNotification($notifiableIds, $type)
    {
        UserNotification::where('notifiable_type', $type)->whereIn('notifiable_id', $notifiableIds)->delete();
    }

    public function deleteAnswerRelations()
    {
        $this->deleteNotification($this->pluck('id'), 'App\Models\Answer');

        $this->bookmarks()->delete();

        $this->deleteNotification($this->votes->pluck('id'), 'App\Models\Vote');
        $this->votes()->delete();

        $this->deleteNotification($this->comments->pluck('id'), 'App\Models\Comment');
        $this->comments()->delete();
    }
}
