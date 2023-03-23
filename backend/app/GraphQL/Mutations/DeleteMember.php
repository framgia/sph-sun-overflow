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
        $authUser = Auth::user();
        $member = Member::find($args['id']);

        if ($authUser->id != $member->team->teamLeader->id && $authUser->role_id != 1) {
            throw new CustomException('You are not allowed to remove members from this team');
        }

        $member->delete();

        return $member;
    }
}
