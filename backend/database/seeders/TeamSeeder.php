<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Team::upsert([
            [
                'id' => 1,
                'name' => 'Team 1',
                'description' => 'This is Team 1',
                'dashboard_content' => 'Team 1 content',
                'user_id' => 1
            ],
            [
                'id' => 2,
                'name' => 'Team 2',
                'description' => 'This is Team 2',
                'dashboard_content' => 'Team 2 content',
                'user_id' => 2
            ],
            [
                'id' => 3,
                'name' => 'Team 3',
                'description' => 'This is Team 3',
                'dashboard_content' => 'Team 3 content',
                'user_id' => 3
            ],
            [
                'id' => 4,
                'name' => 'Team 4',
                'description' => 'This is Team 4',
                'dashboard_content' => 'Team 4 content',
                'user_id' => 4
            ],
            [
                'id' => 5,
                'name' => 'Team 5',
                'description' => 'This is Team 5',
                'dashboard_content' => 'Team 5 content',
                'user_id' => 5
            ],
        ], ['id'], ['name', 'description', 'dashboard_content', 'user_id']);
    }
}
