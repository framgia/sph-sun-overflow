<?php

namespace App\Observers;

use App\Events\NotificationEvent;
use App\Models\Comment;
use App\Models\UserNotification;

class CommentObserver
{
    public $afterCommit = true;

    public function created(Comment $comment)
    {
        if (auth()->id != $comment->commentable->user_id) {
            UserNotification::create([
                'user_id' => $comment->commentable->user_id,
                'notifiable_type' => 'App\Models\Comment',
                'notifiable_id' => $comment->id,
            ]);

            event(new NotificationEvent($comment->commentable->user_id));
        }
    }
}
