<?php

namespace App\Models;

use App\Events\PostedAnswer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = ['vote_count','humanized_created_at','is_created_by_user', 'user_vote'];

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
        return $this->morphMany(Bookmark::class,'bookmarkable');
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

    public function getIsCreatedByUserAttribute()
    {
        return auth()->user()->answers()->where('id', $this->id)->exists();
    }
}
