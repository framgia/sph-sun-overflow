<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Arr;

final class UpdateQuestion
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $questionData = Arr::except($args, ['tags', 'id']);
        $question = auth()->user()->questions()->find($args['id']);

        $question->update($questionData);

        $question->tags()->sync($args['tags']);

        return $question->fresh();
    }
}
