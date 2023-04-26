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

        if (isset($args['user_slug'])) {
            $user_slug = $args['user_slug'];

            return $query->whereHas('members', function ($queryMembers) use ($user_slug) {
                $queryMembers->whereRelation('user', 'slug', $user_slug);
            });
        }

        $user_id = Auth::id();
        $query->where(function ($queryLikeness) use ($user_id) {
            $queryLikeness->where('user_id', $user_id);
            $queryLikeness->orWhereHas('members', function ($queryMembers) use ($user_id) {
                $queryMembers->where('user_id', $user_id);
            });
        });

        return $query;
    }
}
