<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'business_name',
        'dni',
        'address',
        'email',
        'logo',
        'description',
        'phone',
        'user_id'
    ];


    public static function rules ($method) {
    
    return [
        'business_name'    => 'required',
        'dni'              => 'required',
        'address'          => 'required',
        'email'            => 'required',
        'logo'             =>  $method=='POST'?'required':'',
        'description'      => 'required',
        'phone'            => 'required',
        'user_id'          => 'required'
        ];
    }




    public static function getCompany() {
        $company = Company::query()
        ->select("id","business_name","dni","address", "email", "logo", "description", "phone", "email")->get();
        return response()->json($company);
    }


     public static function getCompanybyId($company) {
        $company = Company::query()->select("id","business_name","dni","address", "email", "logo", "description", "phone", "email")->where("id", $company)->get();
        return response()->json($company);
    }

}
