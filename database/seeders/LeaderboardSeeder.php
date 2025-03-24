<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class LeaderboardSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Pro Recycler',
                'email' => 'pro@example.com',
                'password' => Hash::make('password123'),
                'points' => 150
            ],
            [
                'name' => 'Eco Warrior',
                'email' => 'eco@example.com',
                'password' => Hash::make('password123'),
                'points' => 120
            ],
            [
                'name' => 'Green Hero',
                'email' => 'green@example.com',
                'password' => Hash::make('password123'),
                'points' => 100
            ],
            [
                'name' => 'Earth Saver',
                'email' => 'earth@example.com',
                'password' => Hash::make('password123'),
                'points' => 90
            ],
            [
                'name' => 'Trash Hunter',
                'email' => 'hunter@example.com',
                'password' => Hash::make('password123'),
                'points' => 80
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}