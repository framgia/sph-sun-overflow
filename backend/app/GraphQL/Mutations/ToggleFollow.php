<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

final class ToggleFollow
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $user_id = Auth::id();
            $followable = User::findOrFail($args['follow_userID']);

            if ($followable->followable()->whereUserId($user_id)->delete()) {
                return 'Unfollowed User';
            } else {
                $followable->followable()->create(
                    ['user_id' => $user_id],
                );

                return 'Followed User!';
            }
        } catch (Exception $e) {
            return $message = $e->getMessage();
            if (Str::contains($message, 'No query results for model')) {
                return 'Invalid follow_userID';
            } else {
                return 'An error has occurred';
            }
        }
    }
}
