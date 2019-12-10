<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commerce extends Model
{
    protected $fillable = [
        'name',
        'description',
        'legal_id',
        'logo_file_name',
        'logo_update_at',
        'web_site',
        'manager_name',
        'phone',
        'cellphone',
        'email',
        'user_id'
    ];

   public static function rules () {
    return [
        'name'           => 'required',
        'description'    => 'required',
        'logo_file_name' => 'required',
        'web_site'       => 'required',
        'manager_name'   => 'required',
        'phone'      => 'required',
        'cellphone'      => 'required',
        'email'          => 'required',
        'user_id'        => 'required'
        ];
    }




    public static function getCommerce() {
        $commerce = Commerce::query()->select("id","name","description","legal_id", "logo_file_name", "web_site", "manager_name", "phone", "cellphone", "email")->get();
        return response()->json($commerce);
    }


     public static function getCommercebyId($commerce) {
        $commerce = Commerce::query()->select("id","name","description","legal_id", "logo_file_name", "web_site", "manager_name", "phone", "cellphone", "email")->where("id", $commerce)->get();
        return response()->json($commerce);
    }
}
