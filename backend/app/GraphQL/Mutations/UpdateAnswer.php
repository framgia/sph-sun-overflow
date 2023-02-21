<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;

final class UpdateAnswer
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $user = Auth::user();
        $answer = $user->answers()->find($args['id']);

        $answer->update(['content' => $args['content']]);

        return $answer->fresh();
    }
}
