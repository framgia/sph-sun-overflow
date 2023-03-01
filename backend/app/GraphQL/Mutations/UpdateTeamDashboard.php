<?php

namespace App\GraphQL\Mutations;

use App\Models\Team;
use Illuminate\Support\Facades\Auth;

final class UpdateTeamDashboard
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $user = Auth::user();
        $content = Team::find($args['id']);

        if ($user['id'] === $content['teamLeader']['id']) {
            $content->update(['dashboard_content' => $args['dashboard_content']]);
        }

        return  $content->fresh();
    }
}
