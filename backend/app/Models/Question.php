<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Question extends Model
{
    use HasFactory, SoftDeletes;

    const OPEN = 0;
    const CLOSED = 1;
    const DUPLICATE = 2;

    protected $guarded = [];

    protected $appends = ['vote_count','humanized_created_at'];

    protected static function boot() 
    {
        parent::boot();

        static::creating(function ($question) {
            $question->slug = Str::slug($question->title);
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

    public function getHumanizedCreatedAtAttribute()
    {
        return $this->created_at->diffForHumans();
    }

    public function bookmarks()
    {
        return $this->morphMany(Bookmark::class,'bookmarkable');
    }
}
