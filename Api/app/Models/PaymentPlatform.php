<?php

namespace App\Models ;

use Illuminate\Database\Eloquent\Model;

class PaymentPlatform extends Model
{
    protected $fillable = [
        'name',
        'description',
        'avatar_file_name',
        'status'
    ];

    public static function rules () {
        return [
            'name' => 'required|string',
            'description' => 'required|string',
            'avatar' => 'required|image',
            'status' => 'required|int'
        ];
    }
}
