<?php

namespace App\GraphQL\Mutations;

use App\Models\Answer;
use App\Models\Question;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Validator;

final class CreateAnswer
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $checkUser = User::findOrFail($args['user_id']);
            $checkQuestion = Question::findOrFail($args['question_id']);

            $validator = Validator::make($args, [
                'content' => ['required'],
                'user_id' => ['required'],
                'question_id' => ['required']
            ]);

            if ($validator->fails()) {
                return $validator->messages();
            }

            $newAnswer = Answer::create([
                'content' => $args['content'],
                'user_id' => $checkUser->id,
                'question_id' => $checkQuestion->id,
            ]);

            return $newAnswer;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}
