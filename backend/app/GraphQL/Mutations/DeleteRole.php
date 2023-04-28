<?php

namespace App\GraphQL\Mutations;

use App\Models\Role;
use App\Models\User;

final class DeleteRole
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $role = Role::find($args['id']);
        User::where('role_id', $args['id'])->update(['role_id' => 3]);
        $role->delete();
        return $role;
    }
}
