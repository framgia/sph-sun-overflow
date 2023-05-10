<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use App\Models\Question;
use Illuminate\Support\Facades\Auth;

final class DeleteQuestion
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $authUser = Auth::user();
        $question = Question::find($args['id']);

        if ($authUser->id != $question->user->id && $authUser->role_id != 1) {
            throw new CustomException('You are not allowed to delete this question');
        }

        $question->deleteQuestionRelations();

        $question->delete();

        return $question;
    }
}
