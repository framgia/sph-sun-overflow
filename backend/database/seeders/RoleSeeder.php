<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::upsert([
            [
                'id' => 1,
                'name' => 'Admin',
                'description' => 'This is the Admin'
            ],
            [
                'id' => 2,
                'name' => 'Team Leader',
                'description' => 'This is the Team Leader'
            ],
            [
                'id' => 3,
                'name' => 'User',
                'description' => 'This is the User'
            ],
        ], ['id'], ['name', 'description']);
    }
}
