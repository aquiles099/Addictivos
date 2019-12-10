<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Illuminate\Http\Request;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $branch = Branch::all();
        $data = [
            'code' => 200,
            'data' => [
                'branch' => $branch
            ]
        ];

        return response()->json($data);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if( $validator_response =$this->validateData( $request, Branch::rules(), trans('validation') ) ) {
            return $validator_response;
        }
        
        $branch_data = [
            'name'        => $request->name,
            'latitude'    => $request->description,
            'longitude'   => $request->legal_id,
            'address'     => $request->logo_file_name,
            'schedule'    => $request->web_site,
            'commerce_id' => $request->manager_name,
            'allday'      => $request->telephone
        ];


        $branch = Branch::create($branch_data);

        $data = [
            'code' => 200,
            'data' => [
                'branch' => $branch
            ]
        ];

        return response()->json($data);
    
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function show(Branch $branch)
    {
        $branch = Commerce::getBranchbyId($branch);
        $data = [
            'code' => 200,
            'data' => [
                'branch' => $branch
            ]
        ];

        return response()->json($data);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Branch $branch)
    {
        $branch_data = [
            'name'        => $request->name,
            'latitude'    => $request->description,
            'longitude'   => $request->legal_id,
            'address'     => $request->logo_file_name,
            'schedule'    => $request->web_site,
            'commerce_id' => $request->manager_name,
            'allday'      => $request->telephone
        ];

        $branch->update($branch_data);
        $branch->save();


        $data = [
            'code' => 200,
            'data' => [
                'branch' => $branch
            ]
        ];

        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function destroy(Branch $branch)
    {
        $branch->delete();

        $data = [
            'code' => 200,
            'data' => [
                'branch' => $branch
            ]
        ];

        return response()->json($data);
    }
}
