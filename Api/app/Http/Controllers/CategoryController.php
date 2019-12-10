<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Helpers\HStatusHttp;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::select('id','slug', 'title', 'icon_class')
        ->get();

        $data = [
            'code' => HStatusHttp::OK,
            'data' => [
                'categories' => $categories
            ]
        ];
        
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function prepareCreateOrUpdateData(Request $request, $category_id = null)
    {
        if($category_id) {
            if ( !$category=Category::find($category_id) ) {
                return response()->json([
                    'code' => HStatusHttp::NOT_FOUND,
                    'message' => trans('category.not_found')
                ]);            
            }   
        }

        if( $validator_result = $this->validateData( $request, Category::rules(), trans('validation') )) {
            return $validator_result;  
        }

        $category_data = [
            'slug' => '',
            'title' => $request->title,
            'icon_class' => $request->icon_class
        ];

        if(!$category_id){
            $category = $this->create($category_data);
        } else {
            $category = $this->update($category, $category_data);
        }

        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'category' => $category
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create($category_data)
    {
        return  Category::create($category_data);        
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function get($category_id)
    {
        if ( !$category=Category::find($category_id) ) {
            return response()->json([
                'code' => HStatusHttp::NOT_FOUND,
                'message' => trans('category.not_found')
            ]);            
        }
        
        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'category' => $category
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update($category, $category_data)
    {
        $category->fill($category_data)->save();
        return $category;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function delete($category_id)
    {
        if ( !$category=Category::find($category_id) ) {
            return response()->json([
                'code' => HStatusHttp::NOT_FOUND,
                'message' => trans('category.not_found')
            ]);            
        }
        
        $category->delete();

        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'message' => trans('category.deleted')
            ]
        ]);
    }
}
