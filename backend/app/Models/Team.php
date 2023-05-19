<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class Team extends Model
{
    use HasFactory, SoftDeletes;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($team) {
            $slug = Str::slug($team->name);

            $duplicateCount = Team::where('name', $team->name)->count();

            $team->slug = $duplicateCount === 0 ? $slug : "$slug-duplicate-".time();
        });

        static::updating(function ($team) {
            $slug = Str::slug($team->name);

            $teamFirst = Team::where('name', $team->name)->first();
            $duplicateCount = Team::where('name', $team->name)->count();

            if ($teamFirst?->id !== $team->id) {
                $team->slug = $duplicateCount === 0 ? $slug : "$slug-duplicate-".time();
            }
        });
    }

    protected $appends = [
        'members_count', 'is_team_leader', 'questions_asked',
        'questions_answered', 'truncated_name', 'truncated_description',
    ];

    protected $guarded = [];

    public function teamLeader()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function members()
    {
        return $this->hasMany(Member::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function notifications(): MorphMany
    {
        return $this->morphMany(UserNotification::class, 'notifiable');
    }

    public function getMembersCountAttribute()
    {
        return $this->members()->count();
    }

    public function getIsTeamLeaderAttribute()
    {
        return $this->teamLeader->id === Auth::id();
    }

    public function getQuestionsAskedAttribute()
    {
        return $this->questions()->where('team_id', $this->id)->count();
    }

    public function getQuestionsAnsweredAttribute()
    {
        return $this->questions()->where('team_id', $this->id)->has('answers')->count();
    }

    public function getTruncatedNameAttribute()
    {
        return Str::limit($this->name, 45, '...');
    }

    public function getTruncatedDescriptionAttribute()
    {
        return Str::limit($this->description, 70, '...');
    }
}
