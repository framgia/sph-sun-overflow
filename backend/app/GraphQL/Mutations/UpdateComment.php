<?php

namespace App\GraphQL\Mutations;

use App\Models\Comment;
use Exception;
use Illuminate\Support\Facades\Auth;
use Joselfonseca\LighthouseGraphQLPassport\Exceptions\AuthenticationException;

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

            if ($comment->user_id != Auth::id()) {
                throw new AuthenticationException(__('Authentication exception'), __('You cannot edit this comment'));
            }

            $comment->content = $args['content'];
            $comment->save();

            return $comment;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}
