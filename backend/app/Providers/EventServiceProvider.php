<?php

namespace App\Providers;

use App\Models\Answer;
use App\Models\Comment;
use App\Models\Team;
use App\Models\UserRelation;
use App\Models\Vote;
use App\Observers\AnswerObserver;
use App\Observers\CommentObserver;
use App\Observers\TeamObserver;
use App\Observers\UserRelationObserver;
use App\Observers\VoteObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    protected $observers = [
        Answer::class => [AnswerObserver::class],
        Comment::class => [CommentObserver::class],
        Vote::class => [VoteObserver::class],
        UserRelation::class => [UserRelationObserver::class],
        Team::class => [TeamObserver::class],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return false;
    }
}
