<?php

namespace Database\Seeders;

use App\Models\Reward;
use Illuminate\Database\Seeder;

class RewardSeeder extends Seeder
{
    public function run()
    {
        $rewards = [
            // Digital Badges (100-300 points)
            [
                'name' => 'Master Recycler Badge',
                'description' => 'Show off your recycling expertise with this exclusive badge',
                'category' => 'BADGE',
                'points_cost' => 100,
                'image_path' => 'rewards/badges/master-recycler.svg',
                'one_time' => true
            ],
            [
                'name' => 'Eco Warrior Badge',
                'description' => 'A badge for true environmental champions',
                'category' => 'BADGE',
                'points_cost' => 200,
                'image_path' => 'rewards/badges/eco-warior.svg',
                'one_time' => true
            ],
            [
                'name' => 'Green Guardian Badge',
                'description' => 'Prove your dedication to environmental protection',
                'category' => 'BADGE',
                'points_cost' => 300,
                'image_path' => 'rewards/badges/green-guardian.svg',
                'one_time' => true
            ],

            // Profile Themes (200-400 points)
            [
                'name' => 'Forest Theme',
                'description' => 'Transform your profile with beautiful forest imagery',
                'category' => 'THEME',
                'points_cost' => 200,
                'image_path' => 'rewards/themes/forest.png',
                'one_time' => true
            ],
            [
                'name' => 'Ocean Theme',
                'description' => 'Bring the calming waves to your profile',
                'category' => 'THEME',
                'points_cost' => 200,
                'image_path' => 'rewards/themes/ocean.png',
                'one_time' => true
            ],
            [
                'name' => 'Mountain Theme',
                'description' => 'Add majestic mountains to your profile background',
                'category' => 'THEME',
                'points_cost' => 200,
                'image_path' => 'rewards/themes/mountain.png',
                'one_time' => true
            ],

            // Environmental Impact (800-1500 points)
            [
                'name' => 'Plant a Tree',
                'description' => 'We\'ll plant a tree in your name and send you the GPS location',
                'category' => 'IMPACT',
                'points_cost' => 1000,
                'image_path' => 'rewards/impact/tree.png',
                'one_time' => false
            ],
            [
                'name' => 'Ocean Cleanup Support',
                'description' => 'Sponsor the removal of 1kg of plastic from the ocean',
                'category' => 'IMPACT',
                'points_cost' => 800,
                'image_path' => 'rewards/impact/ocean-cleanup.png',
                'one_time' => false
            ],
            [
                'name' => 'Wildlife Protection',
                'description' => 'Support a wildlife conservation project for one month',
                'category' => 'IMPACT',
                'points_cost' => 1500,
                'image_path' => 'rewards/impact/wildlife.png',
                'one_time' => false
            ],

            // Educational Content (150-500 points)
            [
                'name' => 'Zero Waste Guide',
                'description' => 'Comprehensive guide to starting a zero-waste lifestyle',
                'category' => 'EDUCATION',
                'points_cost' => 150,
                'image_path' => 'rewards/education/zero-waste.png',
                'one_time' => true
            ],
            [
                'name' => 'Composting Masterclass',
                'description' => 'Video course on home composting techniques',
                'category' => 'EDUCATION',
                'points_cost' => 300,
                'image_path' => 'rewards/education/composting.png',
                'one_time' => true
            ],
            [
                'name' => 'Upcycling Workshop',
                'description' => 'Access to live online workshop about creative recycling',
                'category' => 'EDUCATION',
                'points_cost' => 500,
                'image_path' => 'rewards/education/upcycling.png',
                'one_time' => true
            ]
        ];

        foreach ($rewards as $reward) {
            Reward::create($reward);
        }
    }
}
