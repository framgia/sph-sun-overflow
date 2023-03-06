<?php

namespace App\GraphQL\Mutations;

use App\Events\NotificationEvent;
use App\Models\Answer;
use App\Models\Question;
use App\Models\User;
use App\Models\UserNotification;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

final class UpsertVote
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            if ($args['voteable_type'] == 'Answer') {
                $voteable = Answer::findOrFail($args['voteable_id']);
            }

            if ($args['voteable_type'] == 'Question') {
                $voteable = Question::findOrFail($args['voteable_id']);
            }

            if ($args['value'] !== 1 and $args['value'] !== -1) {
                return 'Please enter a valid value';
            }

            $current_value = $voteable->votes()->where('user_id', Auth::id())->first()->value ?? 0;

            if ($current_value == $args['value']) {
                $vote = $voteable->votes()->where('user_id', Auth::id())->first();

                UserNotification::where([
                    'notifiable_type' => 'App\Models\Vote',
                    'notifiable_id' => $vote->id,
                ])->delete();

                $vote->delete();

                event(new NotificationEvent($vote->voteable->user_id));

                return 'Vote Removed';
            } else {
                $voteable->votes()->updateOrCreate(
                    ['user_id' => Auth::id()],
                    ['value' => $args['value']]
                );

                $user = User::find($voteable->user_id);
                $user->reputation += $args['value'];
                if ($user->reputation >= 0) {
                    $user->save();
                }

                return 'Voted Successfully';
            }
        } catch (Exception $e) {
            $message = $e->getMessage();
            if (Str::contains($message, 'No query results for model')) {
                return 'Invalid voteable_id';
            } else {
                return 'An error has occurred';
            }
        }
    }
}
