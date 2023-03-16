<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use App\Models\Role;
use App\Models\User;

final class AssignRole
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        if (auth()->user()->role->name != 'Admin') {
            throw new CustomException('You are not allowed to assign Role');
        }

        $role = Role::find($args['role_id']);
        $user = User::find($args['user_id']);
        $user->update(['role_id' => $role->id]);

        return $user->fresh();
    }
}
