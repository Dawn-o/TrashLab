<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrashPrediction extends Model
{
    protected $fillable = [
        'user_id',
        'trash_type',
        'image_path'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
