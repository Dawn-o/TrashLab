<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reward extends Model
{
    protected $fillable = [
        'name',
        'description',
        'category',
        'points_cost',
        'image_path',
        'is_available'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_rewards')
            ->withPivot('redeemed_at')
            ->withTimestamps();
    }

    public static $categories = [
        'BADGE' => 'Digital Badge',
        'THEME' => 'Profile Theme',
        'IMPACT' => 'Environmental Impact',
        'EDUCATION' => 'Educational Content'
    ];
}