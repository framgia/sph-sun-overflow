<?php

namespace App\GraphQL\Queries;

use App\Models\Question as ModelsQuestion;

final class Question
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $question = ModelsQuestion::where('slug', $args["slug"])->first();

        $question->update(["views_count" => $question->views_count + 1 ]);

        return $question->fresh();
    }
}
