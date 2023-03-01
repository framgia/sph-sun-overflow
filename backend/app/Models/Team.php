<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
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




    protected $guarded = [];

    public function teamLeader()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function members()
    {
        return $this->hasMany(Member::class);
    }
}
