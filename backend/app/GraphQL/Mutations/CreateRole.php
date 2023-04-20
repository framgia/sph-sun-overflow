<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use App\Models\Permission;
use App\Models\Role;

final class CreateRole
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        if (strlen($args['name']) > 30) {
            throw new CustomException('Please limit the name to less than 30 characters');
        }

        if (strlen($args['description']) > 250) {
            throw new CustomException('Please limit the description to less than 250 characters');
        }

        if (Role::where('name', $args['name'])->exists()) {
            throw new CustomException('Role already exists.');
        }

        $permissions = array_unique($args['permissions']);

        $check = Permission::whereIn('id', $permissions)->count();

        if (! count($permissions) || $check != count($permissions)) {
            throw new CustomException('Invalid permissions.');
        }

        $role = Role::create([
            'name' => $args['name'],
            'description' => $args['description'],
        ]);

        $role->permissions()->sync($permissions);

        return $role;
    }
}
