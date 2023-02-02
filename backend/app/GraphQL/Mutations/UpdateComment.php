<?php

namespace App\GraphQL\Mutations;

use App\Models\Comment;
use Exception;

final class UpdateComment
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $comment = Comment::findOrFail($args['id']);

            $comment->content = $args['content'];
            $comment->save();

            return $comment;

        } catch(Exception $e) {
            return $e->getMessage();
        }
    }
}
