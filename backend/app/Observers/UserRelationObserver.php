<?php

namespace App\Observers;

use App\Events\NotificationEvent;
use App\Models\UserNotification;
use App\Models\UserRelation;

class UserRelationObserver
{
    public $afterCommit = true;

    public function created(UserRelation $userRelation)
    {
        UserNotification::create([
            'user_id' => $userRelation->following_id,
            'notifiable_type' => 'App\Models\UserRelation',
            'notifiable_id' => $userRelation->id,
        ]);

        if (env('NOTIFY_USERS')) {
            event(new NotificationEvent($userRelation->following_id));
        }
    }
}
