<?php

namespace App\Observers;

use App\Events\NotificationEvent;
use App\Models\UserNotification;
use App\Models\Vote;

class VoteObserver
{
    public $afterCommit = true;

    public function created(Vote $vote)
    {
        UserNotification::create([
            'user_id' => $vote->voteable->user_id,
            'notifiable_type' => 'App\Models\Vote',
            'notifiable_id' => $vote->id,
        ]);

        if (env('NOTIFY_USERS')) {
            event(new NotificationEvent($vote->voteable->user_id));
        }
    }
}
