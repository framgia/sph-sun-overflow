<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    protected $appends = ['is_watched_by_user','count_tagged_questions', 'count_watching_users'];

    public function usersWatching()
    {
        return $this->belongsToMany(User::class);
    }

    public function questions()
    {
        return $this->belongsToMany(Question::class);
    }

    public function getIsWatchedByUserAttribute()
    {
        return auth()->user()->watchedTags()->where('tag_id', $this->id)->exists();
    }
    public function getCountTaggedQuestionsAttribute()
    {
        return $this->belongsToMany(Question::class)->count();

    }
    public function getCountWatchingUsersAttribute()
    {
        return $this->belongsToMany(User::class)->count();
    }
}
