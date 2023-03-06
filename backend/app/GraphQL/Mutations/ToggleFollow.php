<?php

namespace App\GraphQL\Mutations;

use App\Events\NotificationEvent;
use App\Models\User;
use App\Models\UserNotification;
use App\Models\UserRelation;
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
            $user = User::findOrFail($args['user_id']);

            if (Auth::id() == $user->id) {
                return 'Invalid. User Cant Follow Themselves';
            }

            if (! in_array($user->id, Auth::user()->followingIds)) {
                UserRelation::create([
                    'follower_id' => Auth::id(),
                    'following_id' => $user->id,
                ]);

                return "You are now following {$user->first_name} {$user->last_name}";
            } else {
                $relation = UserRelation::where([
                    'follower_id' => Auth::id(),
                    'following_id' => $user->id,
                ])->first();
                error_log($relation->id);
                UserNotification::where([
                    'notifiable_type' => 'App\Models\UserRelation',
                    'notifiable_id' => $relation->id,
                ])->delete();

                $relation->delete();

                event(new NotificationEvent($user->id));

                return "You unfollowed {$user->first_name} {$user->last_name}";
            }
        } catch (Exception $e) {
            $message = $e->getMessage();
            if (Str::contains($message, 'No query results for model')) {
                return 'User does not exist';
            } else {
                return 'An error has occurred';
            }
        }
    }
}
