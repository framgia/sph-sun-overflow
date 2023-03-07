<?php

namespace App\Observers;

use App\Events\NotificationEvent;
use App\Models\Answer;
use App\Models\UserNotification;

class AnswerObserver
{
    public $afterCommit = true;

    public function created(Answer $answer)
    {
        UserNotification::create([
            'user_id' => $answer->question->user_id,
            'notifiable_type' => 'App\Models\Answer',
            'notifiable_id' => $answer->id,
        ]);

        event(new NotificationEvent($answer->question->user_id));
    }

    public function updated(Answer $answer)
    {
        if ($answer->is_correct) {
            UserNotification::create([
                'user_id' => $answer->user_id,
                'notifiable_type' => 'App\Models\Answer',
                'notifiable_id' => $answer->id,
            ]);

            event(new NotificationEvent($answer->user_id));
        }
    }
}
