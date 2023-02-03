<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use App\Models\Question;
use App\Models\User;
use Faker\Core\Number;
use Illuminate\Support\Arr;

final class CreateQuestion
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        if(User::find($args['user_id']) && (int)$args['user_id'] === auth()->user()->id) {
            $questionData = Arr::except($args, ['tags']);

            $questionCreate = Question::create($questionData);

            $questionDetail = Question::find($questionCreate->id);

            $questionDetail->tags()->sync($args['tags']);

            return $questionDetail;
        }

        throw new CustomException('Invalid user!', 'User id did not exist or did not match the authenticated user\'s id.');
    }
}
