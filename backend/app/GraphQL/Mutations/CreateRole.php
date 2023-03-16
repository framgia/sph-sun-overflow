<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;

final class CreateRole
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        if (Auth::user()->role->name != 'Admin') {
            throw new CustomException('You are not allowed to create a role.');
        }

        if (Role::all()->contains('name', $args['name'])) {
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
