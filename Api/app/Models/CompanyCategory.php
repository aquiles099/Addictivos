<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyCategory extends Model
{
    protected $fillable = [
        'company_id',
        'category_id'
    ];
}
