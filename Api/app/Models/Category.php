<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'icon_class'
    ];

    public static function rules () {
        return [
            'title' => 'required|string',
            'icon_class' => 'required|string'
        ];
    }

    public static function getCategoryName($category_id){
        $category = Category::select('categories.title')
        ->where('categories.id', '=', $category_id)
        ->first();

        return $category->title;
    }

}
