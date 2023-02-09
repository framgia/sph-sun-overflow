<?php

namespace App\GraphQL\Mutations;

use App\Models\Tag;
use Exception;
use Illuminate\Support\Facades\Auth;

final class RemoveWatchedTag
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        try {
            $user = Auth::user();
            $tag_exists = Tag::where('id', $args['tag_id'])->exists();
            $tag_relation = $user->watchedTags()->where('tags.id', $args['tag_id'])->exists();
            if ($tag_relation && $tag_exists) {
                $user->watchedTags()->detach($args['tag_id']);

                return 'Successfully removed tag from WatchList';
            } else {
                return 'Failed removing tag from WatchList';
            }
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}
