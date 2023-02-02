<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use App\Models\Question;
use App\Models\User;

final class CreateQuestion
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */

    public function __invoke($_, array $args)
    {
        if(User::find($args['user_id'])) {
            $question = Question::create($args);
            $questionDetail = Question::find($question->id);

            return $questionDetail;
        }

        throw new CustomException('User not found', 'User id did not exist in the database');
    }
}
