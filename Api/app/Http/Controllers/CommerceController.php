<?php

namespace App\Http\Controllers;

use App\Models\Commerce;
use App\Models\CompanyCommerce;
use Illuminate\Http\Request;

class CommerceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $commerce = Commerce::getCommerce();
        $data = [
            'code' => 200,
            'data' => [
                'commerce' => $commerce
            ]
        ];

        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if( $validator_response =$this->validateData( $request, Commerce::rules(), trans('validation') ) ) {
            return $validator_response;
        }
        
        $commerce_data = [
            'name'           => $request->name,
            'description'    => $request->description,
            'legal_id'       => $request->legal_id,
            'logo_file_name' => $request->logo_file_name,
            'web_site'       => $request->web_site,
            'manager_name'   => $request->manager_name,
            'phone'          => $request->phone,
            'cellphone'      => $request->cellphone,
            'email'          => $request->email,
            'user_id'        => $request->user_id
        ];

        $commerce = Commerce::create($commerce_data);

        $companycomerce_data=[
            'company_id'  => $request->company,
            'commerce_id' => $commerce->id,
        ];

        $companycomerce=CompanyCommerce::create($companycomerce_data);

        $data = [
            'code' => 200,
            'data' => [
                'commerce' => $commerce
            ]
        ];

        return response()->json($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Commerce  $commerce
     * @return \Illuminate\Http\Response
     */
    public function show($commerce)
    {

        $commerce = Commerce::getCommercebyId($commerce);
        $data = [
            'code' => 200,
            'data' => [
                'commerce' => $commerce
            ]
        ];

        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Commerce  $commerce
     * @return \Illuminate\Http\Response
     */
    public function edit(Commerce $commerce)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Commerce  $commerce
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Commerce $commerce)
    {

        $commerce_data = [
            'name'           => $request->name,
            'description'    => $request->description,
            'legal_id'       => $request->legal_id,
            'logo_file_name' => $request->logo_file_name,
            'web_site'       => $request->web_site,
            'manager_name'   => $request->manager_name,
            'phone'          => $request->phone,
            'cellphone'      => $request->cellphone,
            'email'          => $request->email,
            'user_id'        => $request->user_id
        ];

        $commerce->update( $commerce_data );
        $commerce->save();


        $commercecompany=CompanyCommerce::query()->where('commerce_id', '=', $commerce->id)->first();

        $companyCommerce->delete();

        $companycomerce_data=[
            'company_id'  => $request->company,
            'commerce_id' => $commerce->id,
        ];

        $companycomerce_result=CompanyCommerce::create($companycomerce_data);


        $data = [
            'code' => 200,
            'data' => [
                'commerce' => $commerce
            ]
        ];

        return response()->json($data);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Commerce  $commerce
     * @return \Illuminate\Http\Response
     */
    public function destroy(Commerce $commerce)
    {

        $commerce->delete();

        $data = [
            'code' => 200,
            'data' => [
                'commerce' => $commerce
            ]
        ];

        return response()->json($data);

    }
}
