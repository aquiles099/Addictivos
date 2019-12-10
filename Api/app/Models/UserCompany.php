<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserCompany extends Model
{
    protected $fillable = [
        'user_id', 
        'company_id'
    ];
}
