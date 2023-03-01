<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use App\Models\Member;
use Illuminate\Support\Facades\Auth;

final class DeleteMember
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $authId = Auth::id();
        $member = Member::find($args['id']);

        if ($authId != $member->team->teamLeader->id) {
            throw new CustomException('You are not allowed to add members to this team');
        }

        $member->delete();

        return $member;
    }
}
