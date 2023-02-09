<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tag::upsert([
            [
                'id' => 1,
                'name' => 'JavaScript',
                'description' => 'For questions about programming in ECMAScript (JavaScript/JS).',
            ],
            [
                'id' => 2,
                'name' => 'Python',
                'description' => 'For questions about programming in Python',
            ],
            [
                'id' => 3,
                'name' => 'PHP',
                'description' => 'For questions about programming in PHP.',
            ],
            [
                'id' => 4,
                'name' => 'Ruby',
                'description' => 'For questions about programming in Ruby.',
            ],
            [
                'id' => 5,
                'name' => 'TypeScript',
                'description' => 'For questions about programming in TypeScript.',
            ],
        ], 'id', ['name', 'description']);
    }
}
