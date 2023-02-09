<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Permission::upsert([
            [
                'id' => 1,
                'name' => 'Add question',
                'description' => 'Can ask a question',
            ],
            [
                'id' => 2,
                'name' => 'Edit question',
                'description' => 'Can edit own question',
            ],
            [
                'id' => 3,
                'name' => 'Delete question',
                'description' => 'Can delete own question',
            ],
            [
                'id' => 4,
                'name' => 'View question',
                'description' => 'Can view a question',
            ],
            [
                'id' => 5,
                'name' => 'Add role',
                'description' => 'Can add a role',
            ],
            [
                'id' => 6,
                'name' => 'Edit role',
                'description' => 'Can edit a role',
            ],
            [
                'id' => 7,
                'name' => 'Delete role',
                'description' => 'Can delete a role',
            ],
            [
                'id' => 8,
                'name' => 'View role',
                'description' => 'Can view a role',
            ],
            [
                'id' => 9,
                'name' => 'Assign role',
                'description' => 'Can assign a role',
            ],
            [
                'id' => 10,
                'name' => 'Vote question',
                'description' => 'Can vote a question',
            ],
            [
                'id' => 11,
                'name' => 'Vote answer',
                'description' => 'Can vote an answer',
            ],
            [
                'id' => 12,
                'name' => 'Add answer',
                'description' => 'Can add an answer',
            ],
            [
                'id' => 13,
                'name' => 'Edit answer',
                'description' => 'Can edit own answer',
            ],
            [
                'id' => 14,
                'name' => 'Delete answer',
                'description' => 'Can delete own answer',
            ],
            [
                'id' => 15,
                'name' => 'Add comment',
                'description' => 'Can add a comment',
            ],
            [
                'id' => 16,
                'name' => 'Edit comment',
                'description' => 'Can edit own comment',
            ],
            [
                'id' => 17,
                'name' => 'Delete comment',
                'description' => 'Can delete own comment',
            ],
            [
                'id' => 18,
                'name' => 'Add team',
                'description' => 'Can add a team',
            ],
            [
                'id' => 19,
                'name' => 'Edit team',
                'description' => 'Can edit own team',
            ],
            [
                'id' => 20,
                'name' => 'Delete team',
                'description' => 'Can delete own team',
            ],
            [
                'id' => 21,
                'name' => 'Add team role',
                'description' => 'Can add a team role',
            ],
            [
                'id' => 22,
                'name' => 'Edit team role',
                'description' => 'Can edit own team role',
            ],
            [
                'id' => 23,
                'name' => 'Delete team role',
                'description' => 'Can delete own team role',
            ],
        ], ['id'], ['name', 'description']);

        $admin = Role::find(1);
        $teamLead = Role::find(2);
        $user = Role::find(3);

        $admin->permissions()->sync(
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
        );
        $teamLead->permissions()->sync([1, 2, 3, 4, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
        $user->permissions()->sync([1, 2, 3, 4, 8, 10, 11, 12, 13, 14, 15, 16, 17]);
    }
}
