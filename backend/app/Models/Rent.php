<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Rent extends Model
{
    protected $table = 'rents';
    use HasFactory, HasApiTokens, Notifiable;
    protected $fillable = [
        'tenant',
        'no_car',
        'date_borrow',
        'date_return',
        'down_payment',
        'discount',
        'total',
    ];

    /**
     * Get the user that owns the Tenant
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'tenant');
    }
}
