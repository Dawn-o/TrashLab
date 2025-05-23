<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'active_badge'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = ['badge_url'];

    public function rewards()
    {
        return $this->belongsToMany(Reward::class, 'user_rewards')
            ->withPivot('redeemed_at')
            ->withTimestamps();
    }

    public function getBadgeUrlAttribute()
    {
        if ($this->active_badge === 'default_badge') {
            return asset('storage/badges/default.png');
        }

        $badge = $this->rewards()
            ->where('rewards.id', $this->active_badge)
            ->where('category', 'BADGE')
            ->first();

        return $badge 
            ? asset('storage/' . $badge->image_path)
            : asset('storage/badges/default.png');
    }

    public function setActiveBadge($badgeId)
    {
        $badge = $this->rewards()
            ->where('rewards.id', $badgeId)
            ->where('category', 'BADGE')
            ->first();

        if (!$badge) {
            throw new \Exception('Badge not found or not owned');
        }

        $this->active_badge = $badgeId;
        $this->save();
    }
}
