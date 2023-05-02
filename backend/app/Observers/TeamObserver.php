<?php

namespace App\Observers;

use App\Models\Team;

class TeamObserver
{
    public $afterCommit = true;

    public function created(Team $team)
    {
        $team->members()->create([
            'user_id' => $team->user_id,
            'team_id' => $team->id,
            'team_role_id' => 1
        ]);
    }
}
