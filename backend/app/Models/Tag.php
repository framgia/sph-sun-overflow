<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Tag extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    protected $appends = [
        'is_watched_by_user', 'count_tagged_questions', 'count_watching_users',
        'truncated_name', 'truncated_description',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($tag) {
            $tag->slug = Str::slug($tag->name);
        });

        static::updating(function ($tag) {
            $tag->slug = Str::slug($tag->name);
        });
    }

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
        if (auth()->user()) {
            return auth()->user()->watchedTags()->where('tag_id', $this->id)->exists();
        }

        return null;
    }

    public function getCountTaggedQuestionsAttribute()
    {
        return $this->belongsToMany(Question::class)->count();
    }

    public function getCountWatchingUsersAttribute()
    {
        return $this->belongsToMany(User::class)->count();
    }

    public function getTruncatedNameAttribute()
    {
        $name = $this->name;

        return Str::limit($name, 15, '...');
    }

    public function getTruncatedDescriptionAttribute()
    {
        $description = $this->description;

        return Str::limit($description, 50, '...');
    }
}
