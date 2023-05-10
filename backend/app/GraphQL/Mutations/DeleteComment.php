<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use App\Models\Comment;
use App\Models\UserNotification;
use Illuminate\Support\Facades\Auth;

final class DeleteComment
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $authUser = Auth::user();
        $comment = Comment::find($args['id']);

        if ($authUser->id != $comment->user->id && $authUser->role_id != 1) {
            throw new CustomException('You are not allowed to delete this comment');
        }

        UserNotification::where([
            'notifiable_type' => 'App\Models\Comment',
            'notifiable_id' => $comment->id,
        ])->delete();

        $comment->delete();

        return $comment;
    }
}
