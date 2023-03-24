<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use App\Models\Member;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

final class UpdateMember
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $authUser = Auth::user();
        $member = Member::find($args['id']);
        $updateData = Arr::except($args, ['tags']);

        if ($authUser->id != $member->team->teamLeader->id && $authUser->role_id != 1) {
            throw new CustomException('You are not allowed to edit members in this team');
        }

        $member->update($updateData);

        return $member->fresh();
    }
}
