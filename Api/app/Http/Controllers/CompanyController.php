<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $company = Company::getCompany();
        $data = [
            'code' => 200,
            'data' => [
                'company' => $company
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
        if( $validator_response =$this->validateData( $request, Company::rules(), trans('validation') ) ) {
            return $validator_response;
        }
 
        $company_data = [
            'business_name'   => $request->business_name,
            'dni'             => $request->dni,
            'address'         => $request->address,
            'email'           => $request->email,
            'logo'            => $request->logo,
            'description'     => $request->description,
            'phone'           => $request->phone,
            'user_id'         => $request->user_id
        ];

        $company = Company::create($company_data);

        $data = [
            'code' => 200,
            'data' => [
                'company' => $company
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
    public function show($company)
    {

        $company = Company::getCompanybyId($company);
        $data = [
            'code' => 200,
            'data' => [
                'company' => $company
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
    public function update(Request $request, Company $company)
    {

        $company_data = [
            'business_name'   => $request->business_name,
            'dni'             => $request->dni,
            'address'         => $request->address,
            'email'           => $request->email,
            'logo'            => $request->logo,
            'description'     => $request->description,
            'phone'           => $request->phone,
            'user_id'         => $request->user_id
        ];

        $company->update($company_data);
        $company->save();



        $data = [
            'code' => 200,
            'data' => [
                'company' => $company
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
    public function destroy(Company $company)
    {

        $company->delete();

        $data = [
            'code' => 200,
            'data' => [
                'company' => $company
            ]
        ];

        return response()->json($data);

    }
}
