<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Models\GraphQLPassportSocialite\HasSocialLogin;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasSocialLogin;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    protected $appends = ['question_count', 'answer_count', 'top_questions', 'top_answers'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            $slug = Str::slug($user->first_name . ' ' . $user->last_name);

            $duplicateCount = User::where('first_name', $user->first_name)
                ->where('last_name', $user->last_name)->count();

            $user->slug = $duplicateCount === 0 ? $slug : "$slug-duplicate-$duplicateCount";
        });
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function notifications()
    {
        return $this->hasMany(UserNotification::class);
    }

    public function watchedTags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function teamsLed()
    {
        return $this->hasMany(Team::class);
    }

    public function teams()
    {
        return $this->hasMany(Member::class, 'user_id');
    }

    public function bookmarks()
    {
        return $this->hasMany(Bookmark::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function getQuestionCountAttribute()
    {
        return $this->questions()->count();
    }

    public function getAnswerCountAttribute()
    {
        return $this->answers()->count();
    }

    public function getTopQuestionsAttribute()
    {
        return $this->questions->where('vote_count', '>', 0)->sortByDesc(function ($question) {
            return $question->votes->sum('value');
        })->take(5)->map(function ($q) {
            return $q->fresh();
        });
    }

    public function getTopAnswersAttribute()
    {
        return $this->answers->where('vote_count', '>', 0)->sortByDesc(function ($answer) {
            return $answer->votes->sum('value');
        })->take(5)->map(function ($a) {
            return $a->fresh();
        });
    }
}
