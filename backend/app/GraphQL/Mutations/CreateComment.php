<?php

namespace App\GraphQL\Mutations;

use App\Models\Answer;
use App\Models\Comment;
use App\Models\Question;
use App\Models\User;
use Exception;

final class CreateComment
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $user = User::findOrFail($args['user_id']);
            
            if($args['commentable_type'] == "Answer") {
                $commentable = Answer::findOrFail($args['commentable_id']);
            }

            if($args['commentable_type'] == "Question") {
                $commentable = Question::findOrFail($args['commentable_id']);
            }
            
            $comment = Comment::create([
                'content' => $args['content'],
                'user_id' => $user->id,
                'commentable_type' => 'App\\Models\\'.$args['commentable_type'],
                'commentable_id' => $commentable->id,
            ]);

            return $comment;

        } catch(Exception $e) {
            return $e->getMessage();
        }
    }
}
