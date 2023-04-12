<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use App\Models\Tag;
use Exception;
use Illuminate\Support\Str;

final class UpdateTag
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
        
        if (strlen($args['description']) > 250) {
            throw new CustomException('Please limit the description to less than 250 characters');
        }

        try {
            $tag = Tag::findOrFail($args['id']);

            $tag->name = $args['name'];
            $tag->description = $args['description'];

            if ($tag->isDirty('name') && Tag::where('name', $tag->name)->exists()) {
                return new CustomException('Tag already exists.');
            }

            if ($tag->isClean()) {
                return new CustomException('No values to update.');
            }

            $tag->save();

            return $tag;
        } catch (Exception $e) {
            $message = $e->getMessage();
            if (Str::contains($message, 'No query results for model')) {
                return new CustomException('Invalid tag ID.');
            } else {
                return new CustomException('An error has occured.');
            }
        }
    }
}
