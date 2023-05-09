<?php

namespace App\Observers;

use App\Models\Member;
use App\Models\Team;

class TeamObserver
{
    public $afterCommit = true;

    public function created(Team $team)
    {
        $team->members()->create([
            'user_id' => $team->user_id,
            'team_id' => $team->id,
        ]);
    }

    public function deleting(Team $team)
    {
        Member::where('team_id', $team->id)->delete();
    }
}
