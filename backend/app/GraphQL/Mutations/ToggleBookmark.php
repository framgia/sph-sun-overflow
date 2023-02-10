<?php

namespace App\GraphQL\Mutations;

use App\Models\Answer;
use App\Models\Question;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

final class ToggleBookmark
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $user_id = Auth::id();

            if ($args['bookmarkable_type'] == 'Answer') {
                $bookmarkable = Answer::findOrFail($args['bookmarkable_id']);
            }

            if ($args['bookmarkable_type'] == 'Question') {
                $bookmarkable = Question::findOrFail($args['bookmarkable_id']);
            }

            if ($bookmarkable->bookmarks()->whereUserId($user_id)->delete()) {
                return 'Successfully Removed';
            } else {
                $bookmarkable->bookmarks()->create(
                    ['user_id' => Auth::id()],
                );

                return 'Bookmarked Successfully';
            }
        } catch (Exception $e) {
            return $message = $e->getMessage();
            if (Str::contains($message, 'No query results for model')) {
                return 'Invalid bookmarkable_id';
            } else {
                return 'An error has occurred';
            }
        }
    }
}
