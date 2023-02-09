<?php

namespace App\GraphQL\Mutations;

use App\Models\Answer;
use App\Models\Question;
use Exception;

final class AcceptAnswer
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

            if ($checkAccepted) {
                return 'Only one answer can be accepted';
            }

            $answer->is_correct = true;
            $answer->save();

            return 'Answer was accepted successfully';
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}
