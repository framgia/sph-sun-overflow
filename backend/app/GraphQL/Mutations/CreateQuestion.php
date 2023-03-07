<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
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

        $hasNoTeam = ! isset($args['team_id']) || ! $args['team_id'];

        if ($hasNoTeam && (isset($args['is_public']) && ! $args['is_public'])) {
            throw new CustomException('400', 'Public is required when no team is selected');
        }

        $questionCreate = auth()->user()->questions()->create($questionData);

        $questionDetail = Question::find($questionCreate->id);

        $questionDetail->tags()->sync($args['tags']);

        return $questionDetail;
    }
}
