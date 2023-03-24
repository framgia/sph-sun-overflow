<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use App\Models\Member;
use App\Models\Team;
use Illuminate\Support\Facades\Auth;

final class AddMember
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $authUser = Auth::user();
        $team = Team::find($args['team_id']);

        if ($authUser->id != $team->teamLeader->id && $authUser->role_id != 1) {
            throw new CustomException('You are not allowed to add members to this team');
        }

        $member = Member::create($args);

        return $member;
    }
}
