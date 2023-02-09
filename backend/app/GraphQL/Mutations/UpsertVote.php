<?php

namespace App\GraphQL\Mutations;

use App\Models\Answer;
use App\Models\Question;
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
                $voteable->votes()->where('user_id', Auth::id())->delete();

                return 'Vote Removed';
            } else {
                $voteable->votes()->updateOrCreate(
                    ['user_id' => Auth::id()],
                    ['value' => $args['value']]
                );

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
