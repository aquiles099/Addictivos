<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoleAccess extends Model
{
    protected $fillable = [
        'role_id',
        'access_id'
    ];
}
