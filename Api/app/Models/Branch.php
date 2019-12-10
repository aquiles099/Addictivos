<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    protected $fillable = [
        'name',
        'latitude',
        'longitude',
        'address',
        'schedule',
        'commerce_id',
        'allday'
    ];



    public static function rules () {
    
    return [
        'name'        => 'required',
        'latitude'    => 'required',
        'longitude'   => 'required',
        'address'     => 'required',
        'schedule'    => 'required',
        'commerce_id' => 'required',
        'allday'      => 'required'
        ];
    }




    public static function getCommerce() {
        $branch = Branch::query()->select("name","latitude","longitude", "address", "schedule", "allday", "commerce_id")->get();
        return response()->json($branch);
    }


     public static function getCommercebyId($branch) {
        $branch = Commerce::query()->select("name","latitude","longitude", "address", "schedule", "allday", "commerce_id")->where("id", $branch)->get();
        return response()->json($branch);
    }
}
