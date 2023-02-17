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
                $query->has('answers');
            } else {
                $query->doesntHave('answers');
            }

            if ($args['tag'] != null) {
                $query->whereHas('tags', function ($tags) use ($args) {
                    $tags->where('tag_id', $args['tag']);
                });
            }

            if (isset($args['keyword'])) {
                $keywordLikeness = '%'.$args['keyword'].'%';

                $query->where('title', 'like', $keywordLikeness)->orWhere('content', 'like', $keywordLikeness);
            }

            return $query;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}
