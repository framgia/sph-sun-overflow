<?php

namespace App\GraphQL\Queries;

use App\Models\Member;
use Illuminate\Support\Facades\Log;

final class UserTeams
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $members = Member::where('user_id', $args['id']);

        return $members;
    }
}
