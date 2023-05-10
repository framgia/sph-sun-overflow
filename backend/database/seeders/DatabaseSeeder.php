<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            UserSeeder::class,
            QuestionSeeder::class,
            AnswerSeeder::class,
            CommentSeeder::class,
            VoteSeeder::class,
            TagSeeder::class,
            TeamRoleSeeder::class,
            TeamSeeder::class,
            MemberSeeder::class,
            BookmarkSeeder::class,
        ]);
    }
}
