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
        $authId = Auth::id();
        $team = Team::find($args['team_id']);

        if ($authId != $team->teamLeader->id) {
            throw new CustomException('You are not allowed to add members to this team');
        }

        $member = Member::create($args);

        return $member;
    }
}
