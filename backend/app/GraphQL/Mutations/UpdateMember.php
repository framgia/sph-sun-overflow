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
        $authId = Auth::id();
        $member = Member::find($args['id']);
        $updateData = Arr::except($args, ['tags']);

        if ($authId != $member->team->teamLeader->id) {
            throw new CustomException('You are not allowed to edit members in this team');
        }

        $member->update($updateData);

        return $member->fresh();
    }
}
