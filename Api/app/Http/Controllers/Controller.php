<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Validator;
use Storage;
use App\Helpers\HStatusHttp;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function validateData ( $request, $rules, $message ) {

        $validator = Validator::make($request->all(), $rules, $message);
        if( !is_null($validator) && ($validator->fails()) ) {
            $data = [
                'message' => 'error',
                'data' => [
                  'errors' => $validator->messages()
                ]
              ];
              return response()->json($data, HStatusHttp::INTERNAL_SERVER_ERROR);
        }

        return null;
        
    }

}
