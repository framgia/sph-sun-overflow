<?php

namespace Database\Seeders;

use App\Models\TeamRole;
use Illuminate\Database\Seeder;

class TeamRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TeamRole::upsert([
            [
                'id' => 1,
                'name' => 'Frontend Dev',
                'description' => 'This is the Frontend Developer',
            ],
            [
                'id' => 2,
                'name' => 'Backend Dev',
                'description' => 'This is the Backend Developer',
            ],
            [
                'id' => 3,
                'name' => 'QA',
                'description' => 'This is the QA Tester',
            ],
        ], 'id', ['name', 'description']);
    }
}
