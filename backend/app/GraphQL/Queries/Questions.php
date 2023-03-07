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
            if (isset($args['keyword'])) {
                $keywordLikeness = '%'.$args['keyword'].'%';

                $query->where(function ($keywordQuery) use ($keywordLikeness) {
                    $keywordQuery->where('title', 'like', $keywordLikeness)
                        ->orWhere('content', 'like', $keywordLikeness);
                });
            }

            if (isset($args['answered'])) {
                if ($args['answered']) {
                    $query->has('answers');
                } else {
                    $query->doesntHave('answers');
                }
            }

            if (isset($args['tag']) && $args['tag']) {
                $query->whereHas('tags', function ($tags) use ($args) {
                    $tags->where('slug', $args['tag']);
                });
            }

            if (isset($args['team']) && $args['team']) {
                $query->whereHas('team', function ($teamQuestions) use ($args) {
                    $teamQuestions->where('slug', $args['team']);
                });

                if (isset($args['is_public'])) {
                    $query->where('is_public', $args['is_public']);
                }
            } else {
                $query->where('is_public', true);
            }

            return $query;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}
