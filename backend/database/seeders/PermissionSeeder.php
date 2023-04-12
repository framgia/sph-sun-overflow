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
                'name' => 'Add',
                'category' => 'Question',
                'slug' => 'add-question',
                'description' => 'Can ask a question',
            ],
            [
                'id' => 2,
                'name' => 'Edit',
                'category' => 'Question',
                'slug' => 'edit-question',
                'description' => 'Can edit own question',
            ],
            [
                'id' => 3,
                'name' => 'Delete',
                'category' => 'Question',
                'slug' => 'delete-question',
                'description' => 'Can delete own question',
            ],
            [
                'id' => 4,
                'name' => 'View',
                'category' => 'Question',
                'slug' => 'view-question',
                'description' => 'Can view a question',
            ],
            [
                'id' => 5,
                'name' => 'Add',
                'category' => 'Role',
                'slug' => 'add-role',
                'description' => 'Can add a role',
            ],
            [
                'id' => 6,
                'name' => 'Edit',
                'category' => 'Role',
                'slug' => 'edit-role',
                'description' => 'Can edit a role',
            ],
            [
                'id' => 7,
                'name' => 'Delete',
                'category' => 'Role',
                'slug' => 'delete-role',
                'description' => 'Can delete a role',
            ],
            [
                'id' => 8,
                'name' => 'View',
                'category' => 'Role',
                'slug' => 'view-role',
                'description' => 'Can view a role',
            ],
            [
                'id' => 9,
                'name' => 'Assign',
                'category' => 'Role',
                'slug' => 'assign-role',
                'description' => 'Can assign a role',
            ],
            [
                'id' => 10,
                'name' => 'Vote',
                'category' => 'Question',
                'slug' => 'vote-question',
                'description' => 'Can vote a question',
            ],
            [
                'id' => 11,
                'name' => 'Vote',
                'category' => 'Answer',
                'slug' => 'vote-answer',
                'description' => 'Can vote an answer',
            ],
            [
                'id' => 12,
                'name' => 'Add',
                'category' => 'Answer',
                'slug' => 'add-answer',
                'description' => 'Can add an answer',
            ],
            [
                'id' => 13,
                'name' => 'Edit',
                'category' => 'Answer',
                'slug' => 'edit-answer',
                'description' => 'Can edit own answer',
            ],
            [
                'id' => 14,
                'name' => 'Delete',
                'category' => 'Answer',
                'slug' => 'delete-answer',
                'description' => 'Can delete own answer',
            ],
            [
                'id' => 15,
                'name' => 'Add',
                'category' => 'Comment',
                'slug' => 'add-comment',
                'description' => 'Can add a comment',
            ],
            [
                'id' => 16,
                'name' => 'Edit',
                'category' => 'Comment',
                'slug' => 'edit-comment',
                'description' => 'Can edit own comment',
            ],
            [
                'id' => 17,
                'name' => 'Delete',
                'category' => 'Comment',
                'slug' => 'delete-comment',
                'description' => 'Can delete own comment',
            ],
            [
                'id' => 18,
                'name' => 'Add',
                'category' => 'Team',
                'slug' => 'add-team',
                'description' => 'Can add a team',
            ],
            [
                'id' => 19,
                'name' => 'Edit',
                'category' => 'Team',
                'slug' => 'edit-team',
                'description' => 'Can edit own team',
            ],
            [
                'id' => 20,
                'name' => 'Delete',
                'category' => 'Team',
                'slug' => 'delete-team',
                'description' => 'Can delete own team',
            ],
            [
                'id' => 21,
                'name' => 'Add',
                'category' => 'Team role',
                'slug' => 'add-team-role',
                'description' => 'Can add a team role',
            ],
            [
                'id' => 22,
                'name' => 'Edit',
                'category' => 'Team role',
                'slug' => 'edit-team-role',
                'description' => 'Can edit own team role',
            ],
            [
                'id' => 23,
                'name' => 'Delete',
                'category' => 'Team role',
                'slug' => 'delete-team-role',
                'description' => 'Can delete own team role',
            ],
            [
                'id' => 24,
                'name' => 'Add',
                'category' => 'Tag',
                'slug' => 'add-tag',
                'description' => 'Can create a tag',
            ],
            [
                'id' => 25,
                'name' => 'Edit',
                'category' => 'Tag',
                'slug' => 'edit-tag',
                'description' => 'Can update a tag',
            ],
            [
                'id' => 26,
                'name' => 'Delete',
                'category' => 'Tag',
                'slug' => 'delete-tag',
                'description' => 'Can delete a tag',
            ],
        ], ['id'], ['name', 'slug', 'description']);

        $admin = Role::find(1);
        $teamLead = Role::find(2);
        $user = Role::find(3);

        $admin->permissions()->sync(
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
        );
        $teamLead->permissions()->sync([1, 2, 3, 4, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
        $user->permissions()->sync([1, 2, 3, 4, 8, 10, 11, 12, 13, 14, 15, 16, 17]);
    }
}
