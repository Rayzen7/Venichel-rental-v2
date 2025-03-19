<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Returns extends Model
{
    protected $table = 'returns';
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = [
        'tenant',
        'no_car',
        'id_penalties',
        'date_borrow',
        'date_return',
        'discount',
        'total'
    ];

    /**
     * Get the user that owns the Returns
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'tenant');
    }

    public function rent()
    {
        return $this->belongsTo(Rent::class, 'no_car');
    }

    public function penalties()
    {
        return $this->belongsTo(Penaltie::class, 'id_penalties');
    }
}
