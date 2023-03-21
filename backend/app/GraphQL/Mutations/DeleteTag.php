<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use App\Models\Tag;

final class DeleteTag
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $tag = Tag::find($args['id']);

        if (! $tag) {
            throw new CustomException('Tag not found!');
        }

        $tag->delete();

        return $tag;
    }
}
