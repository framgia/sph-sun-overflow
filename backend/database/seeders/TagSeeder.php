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
                'slug' => 'javascript',
                'description' => 'For questions about programming in ECMAScript (JavaScript/JS).',
            ],
            [
                'id' => 2,
                'name' => 'Python',
                'slug' => 'python',
                'description' => 'For questions about programming in Python',
            ],
            [
                'id' => 3,
                'name' => 'PHP',
                'slug' => 'php',
                'description' => 'For questions about programming in PHP.',
            ],
            [
                'id' => 4,
                'name' => 'Ruby',
                'slug' => 'ruby',
                'description' => 'For questions about programming in Ruby.',
            ],
            [
                'id' => 5,
                'name' => 'TypeScript',
                'slug' => 'typescript',
                'description' => 'For questions about programming in TypeScript.',
            ],
            [
                'id' => 6,
                'name' => 'React',
                'slug' => 'react',
                'description' => 'For questions about programming in Rae.',
            ],
            [
                'id' => 7,
                'name' => 'Next.js',
                'slug' => 'next.js',
                'description' => 'For questions about programming in NextJS.',
            ],
            [
                'id' => 8,
                'name' => 'Laravel',
                'slug' => 'laravel',
                'description' => 'For questions about programming in Laravel.',
            ],
            [
                'id' => 9,
                'name' => 'HTML',
                'slug' => 'html',
                'description' => 'For questions about programming in HTML.',
            ],
            [
                'id' => 10,
                'name' => 'CSS',
                'slug' => 'css',
                'description' => 'For questions about programming in CSS.',
            ],
        ], 'id', ['name', 'description']);
    }
}
