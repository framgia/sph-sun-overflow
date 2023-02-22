<?php

namespace App\GraphQL\Mutations;

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
            $authUser = Auth::user();

            if ($authUser->id == $args['user_id']) {
                return 'Invalid. User Cant Follow Themselves';
            }

            $following = $authUser->following()->where('following_id', $args['user_id'])->first();
            if ($following) {
                $following->delete();

                return 'Unfollow User';
            } else {
                $authUser->following()->create(
                    ['following_id' => $args['user_id']],
                );

                return 'Follow User';
            }
        } catch (Exception $e) {
            return $message = $e->getMessage();
            if (Str::contains($message, 'No query results for model')) {
                return 'Invalid follow_id';
            } else {
                return 'An error has occurred';
            }
        }
    }
}
