<?php

namespace App\Models;

use App\Events\PostedAnswer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $guarded = [];

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
}
