<?php

namespace App\Observers;

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
    }

    public function deleted(UserRelation $userRelation)
    {
        UserNotification::where([
            'notifiable_type' => 'App\Models\UserRelation',
            'notifiable_id' => $userRelation->id,
        ])->first()->delete();
    }
}
