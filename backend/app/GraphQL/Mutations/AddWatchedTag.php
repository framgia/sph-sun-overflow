<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use App\Models\User;
use App\Models\Tag;
use Illuminate\Support\Facades\Auth;
use Exception;
final class AddWatchedTag
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
        try{
            $user =Auth::user();

            $tag_exists = Tag::where('id',$args['tag_id'])->exists();
            $tag_relation = $user->watchedTags()->where('tags.id',$args['tag_id'])->exists();

            if(!$tag_relation && $tag_exists ){
                $user->watchedTags()->attach($args['tag_id']);
                return "Successfully added the tag";
            }else{
                throw new CustomException("Failed adding tag to WatchList");
            }
        }catch(Exception $e){
            return $e->getMessage();
        }
    }
}
