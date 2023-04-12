<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use App\Models\Tag;

final class CreateTag
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        if (strlen($args['name']) > 30) {
            throw new CustomException('Please limit the title to less than 30 characters');
        }

        if (Tag::where('name', $args['name'])->exists()) {
            throw new CustomException('Tag already exists.');
        }

        $tag = Tag::create([
            'name' => $args['name'],
            'description' => $args['description'],
        ]);

        return $tag;
    }
}
