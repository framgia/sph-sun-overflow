<?php

namespace App\GraphQL\Mutations;

use App\Models\Answer;
use App\Models\Question;
use Exception;
use Illuminate\Support\Facades\Auth;

final class CreateComment
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            if ($args['commentable_type'] == 'Answer') {
                $commentable = Answer::findOrFail($args['commentable_id']);
            }

            if ($args['commentable_type'] == 'Question') {
                $commentable = Question::findOrFail($args['commentable_id']);
            }

            $comment = $commentable->comments()->create([
                'content' => $args['content'],
                'user_id' => Auth::id(),
            ]);

            return $comment;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}
