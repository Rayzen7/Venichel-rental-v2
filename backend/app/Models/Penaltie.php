<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PhpParser\Node\Stmt\Return_;

class Penaltie extends Model
{
    protected $table = 'penalties';
    use HasFactory, HasApiTokens, Notifiable;
    protected $fillable = [
        'penalties_name',
        'description',
        'no_car',
        'penalties_total'
    ];

    /**
     * Get all of the comments for the Penaltie
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function return()
    {
        return $this->hasMany(Returns::class, 'id_penalties');
    }

    /**
     * Get the user that owns the Penaltie
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function rent()
    {
        return $this->belongsTo(Rent::class, 'no_car');
    }
}
