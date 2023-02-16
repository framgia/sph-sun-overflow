<?php

namespace App\GraphQL\Queries;
use App\Models\Tag;

final class Tags
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        if($args['column']=== 'questions_count'){
            return Tag::withCount('questions')->orderBy('questions_count',$args['order']);
        }

        if($args['column']=== 'watching_count'){
            return Tag::withCount('usersWatching')->orderBy('users_watching_count',$args['order']);
        }

        return Tag::query()->orderby($args['column'],$args['order']);

    }
}
