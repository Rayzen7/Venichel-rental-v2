<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Role extends Model
{
    protected $table = 'roles';
    use HasFactory, Notifiable, HasApiTokens;
    protected $fillable = [
        'name'
    ];
}
