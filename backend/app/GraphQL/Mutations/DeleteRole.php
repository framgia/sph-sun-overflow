<?php

namespace App\GraphQL\Mutations;

use App\Models\Role;

final class DeleteRole
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $role = Role::find($args['id']);
        $role->delete();

        return $role;
    }
}
