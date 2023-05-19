<?php

namespace App\GraphQL\Mutations;

use App\Helpers\MoveImages;
use App\Models\Question;
use Illuminate\Support\Arr;

final class CreateQuestion
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $questionData = Arr::except($args, ['tags']);
        $questionData['content'] = MoveImages::move($args['content']);

        $questionCreate = auth()->user()->questions()->create($questionData);

        $questionDetail = Question::find($questionCreate->id);

        $questionDetail->tags()->sync($args['tags']);

        return $questionDetail;
    }
}
