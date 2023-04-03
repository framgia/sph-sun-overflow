<?php

namespace App\GraphQL\Queries;

use App\Models\Team;
use Illuminate\Support\Facades\Auth;

final class Teams
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $query = Team::query()->orderBy('created_at', 'desc');

        if ($args['isAdmin']) {
            return $query;
        }

        $user_id = Auth::id();

        $query->where('user_id', $user_id);
        $query->orWhereHas('members', function ($queryMembers) use ($user_id) {
            $queryMembers->where('user_id', $user_id);
        });

        return $query;
    }
}
