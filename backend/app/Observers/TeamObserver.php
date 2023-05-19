<?php

namespace App\Observers;

use App\Events\NotificationEvent;
use App\Models\Member;
use App\Models\Team;
use App\Models\UserNotification;
use Illuminate\Support\Facades\Auth;

class TeamObserver
{
    public $afterCommit = true;

    public function created(Team $team)
    {
        $team->members()->create([
            'user_id' => $team->user_id,
            'team_id' => $team->id,
        ]);

        if (! Auth::check()) {
            return;
        }

        if (Auth::id() != $team->user_id) {
            UserNotification::create([
                'user_id' => $team->user_id,
                'notifiable_type' => 'App\Models\Team',
                'notifiable_id' => $team->id,
            ]);

            if (env('NOTIFY_USERS')) {
                event(new NotificationEvent($team->user_id));
            }
        }
    }

    public function deleting(Team $team)
    {
        Member::where('team_id', $team->id)->delete();
    }
}
