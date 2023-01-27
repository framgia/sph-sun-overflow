<?php

namespace Database\Seeders;

use App\Models\Member;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Member::upsert([
            [
                'id' => 1,
                'user_id' => 6,
                'team_role_id' => 1,
                'team_id' => 1
            ],
            [
                'id' => 2,
                'user_id' => 7,
                'team_role_id' => 2,
                'team_id' => 1
            ],
            [
                'id' => 3,
                'user_id' => 8,
                'team_role_id' => 3,
                'team_id' => 1
            ],
            [
                'id' => 4,
                'user_id' => 9,
                'team_role_id' => 1,
                'team_id' => 2
            ],
            [
                'id' => 5,
                'user_id' => 10,
                'team_role_id' => 1,
                'team_id' => 3
            ],
        ], ['id'], ['user_id', 'team_role_id', 'team_id']);
    }
}
