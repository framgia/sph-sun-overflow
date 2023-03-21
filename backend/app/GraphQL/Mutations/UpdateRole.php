<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use App\Models\Role;

final class UpdateRole
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        if (Role::where('name', $args['name'])->where('id', '!=', $args['id'])->exists()) {
            throw new CustomException('Role already exists.');
        }

        $role = Role::find($args['id']);

        $role->update([
            'name' => $args['name'],
            'description' => $args['description'],
        ]);

        $role->permissions()->sync($args['permissions']);

        return $role;
    }
}
