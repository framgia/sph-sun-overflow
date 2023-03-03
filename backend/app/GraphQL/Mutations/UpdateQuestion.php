<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
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

        $hasNoTeam = !isset($args['team_id']) || $args['team_id'] === null;

        if($hasNoTeam && (isset($args['is_public']) && $args['is_public'] === false)) {
            throw new CustomException('400', 'Public is required when no team is selected');
        }

        $question->update($questionData);

        $question->tags()->sync($args['tags']);

        return $question->fresh();
    }
}
