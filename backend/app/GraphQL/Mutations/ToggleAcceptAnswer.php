<?php

namespace App\GraphQL\Mutations;

use App\Models\Answer;
use App\Models\Question;
use App\Models\User;
use Exception;

final class ToggleAcceptAnswer
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        try {
            $question = Question::findOrFail($args['question_id']);

            $answer = Answer::findOrFail($args['answer_id']);
            $checkAccepted = $question->answers()->where('answers.is_correct', true)->exists();

            if($answer->is_correct == true){

                $answer->is_correct = false;
                $answer->save();

                $user = User::find($answer->user_id);
                $user->reputation -= 1;
                $user->save();

                return 'Answer was unaccepted successfully';

            }

            if ($checkAccepted) {
                return 'Only one answer can be accepted';
            }

            $answer->is_correct = true;
            $answer->save();

            $user = User::find($answer->user_id);
            $user->reputation += 1;
            $user->save();

            return 'Answer was accepted successfully';

        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}
