<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use App\Models\Answer;
use Illuminate\Support\Facades\Auth;

final class DeleteAnswer
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $authUser = Auth::user();
        $answer = Answer::find($args['id']);

        if ($authUser->id != $answer->user->id && $authUser->role_id != 1) {
            throw new CustomException('You are not allowed to delete this answer');
        }

        $answer->deleteAnswerRelations();

        $answer->delete();

        return $answer;
    }
}
