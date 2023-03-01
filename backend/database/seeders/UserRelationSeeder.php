<?php

namespace Database\Seeders;

use App\Models\UserRelation;
use Illuminate\Database\Seeder;

class UserRelationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UserRelation::factory(10)->create();
    }
}
