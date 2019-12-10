<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ImagesDeal;

class ImagesDealController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        return 'hola';
        $image_deal_data = [
            $request->avatar_file_name,
            $image->deal_id
        ];
        ImagesDeal::create($image_deal_data);
        
        return $images_deals;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\images_deal  $images_deal
     * @return \Illuminate\Http\Response
     */
    public function show(images_deal $images_deal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\images_deal  $images_deal
     * @return \Illuminate\Http\Response
     */
    public function edit(images_deal $images_deal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\images_deal  $images_deal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, images_deal $images_deal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\images_deal  $images_deal
     * @return \Illuminate\Http\Response
     */
    public function destroy(images_deal $images_deal)
    {
        //
    }
}
