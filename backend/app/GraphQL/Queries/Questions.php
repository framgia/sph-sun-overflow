<?php

namespace App\GraphQL\Queries;

use App\Models\Question;
use Exception;

final class Questions
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $query = Question::query();

        try {
            if ($args['answered'] == 1) {
                if ($args['tag'] != null) {
                    $query->has('answers')->whereHas('tags', function ($tags) use ($args) {
                        $tags->where('tag_id', $args['tag']);
                    });
                } else {
                    $query->has('answers');
                }
            } else {
                if ($args['tag'] != null) {
                    $query->doesntHave('answers')->whereHas('tags', function ($tags) use ($args) {
                        $tags->where('tag_id', $args['tag']);
                    });
                } else {
                    $query->doesntHave('answers');
                }
            }

            return $query;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}
