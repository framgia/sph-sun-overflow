<?php

namespace App\Observers;

use App\Events\NotificationEvent;
use App\Models\Answer;
use App\Models\UserNotification;
use Illuminate\Support\Facades\Auth;

class AnswerObserver
{
    public $afterCommit = true;

    public function created(Answer $answer)
    {
        if (! auth()->check()) {
            return;
        }

        if (auth()->id != $answer->user_id) {
            UserNotification::create([
                'user_id' => $answer->question->user_id,
                'notifiable_type' => 'App\Models\Answer',
                'notifiable_id' => $answer->id,
            ]);

            event(new NotificationEvent($answer->question->user_id));
        }
    }

    public function updated(Answer $answer)
    {
        if ($answer->is_correct) {
            if (Auth::id() != $answer->user_id) {
                UserNotification::create([
                    'user_id' => $answer->user_id,
                    'notifiable_type' => 'App\Models\Answer',
                    'notifiable_id' => $answer->id,
                ]);
                if (env('NOTIFY_USERS')) {
                    event(new NotificationEvent($answer->user_id));
                }
            }
        }
    }
}
