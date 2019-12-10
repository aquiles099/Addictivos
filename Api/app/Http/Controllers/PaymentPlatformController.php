<?php

namespace App\Http\Controllers;

use App\Models\PaymentPlatform;
use Illuminate\Http\Request;
use App\Helpers\HStatusHttp;
use App\Helpers\HPath;
use App\Jobs\GetImages;
use App\Jobs\SaveImage;

class PaymentPlatformController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $payment_platform = PaymentPlatform::select('*')
        ->get();

        $data = [
            'code' => HStatusHttp::OK,
            'data' => [
                'payment_platform' => $payment_platform
            ]
        ];
        
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function prepareCreateOrUpdateData(Request $request, $payment_platform_id = null)
    {
        //$environment = App::environment();
        
        if($payment_platform_id) {
            if ( !$payment_platform=PaymentPlatform::find($payment_platform_id) ) {
                return response()->json([
                    'code' => HStatusHttp::NOT_FOUND,
                    'message' => 'Plataforma de pago no encontrada'
                ]);            
            }   
        }

        if( $validator_result = $this->validateData( $request, PaymentPlatform::rules(), trans('validation') )) {
            return $validator_result;  
        }

        $payment_platform_data = [
            'name' => $request->name,
            'description' => $request->description,
            'avatar_file_name' => '',
            'status' => $request->status
        ];    

        if(!$payment_platform_id){
            $payment_platform = $this->create($payment_platform_data);
        } else {
            $payment_platform = $this->update($payment_platform, $payment_platform_data);
        }

        $full_path = 'storage/'.HPath::AVATAR_PAYMENT_PLATFORM . '/'. $payment_platform->id;

        if($files=$request->file('avatar')){
            $name=$files->getClientOriginalName();
            $files->move($full_path,$name);
            $full_path=$full_path.'/'.$name;
        }
  

        $payment_platform->avatar_file_name =env('APP_URL').$full_path;
        $payment_platform->save();

        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'payment_platform' => $payment_platform
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create($payment_platform_data)
    {
        return  PaymentPlatform::create($payment_platform_data);        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PaymentPlatform  $paymentPlatform
     * @return \Illuminate\Http\Response
     */
    public function get($payment_platform_id)
    {
        if ( !$payment_platform=PaymentPlatform::find($payment_platform_id) ) {
            return response()->json([
                'code' => HStatusHttp::NOT_FOUND,
                'message' => 'Plataforma de pago no encontrada'
            ]);            
        }
        
        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'payment_platform' => $payment_platform
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PaymentPlatform  $paymentPlatform
     * @return \Illuminate\Http\Response
     */
    public function update($payment_platform, $payment_platform_data)
    {
        $payment_platform->fill($payment_platform_data)->save();
        return $payment_platform;
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PaymentPlatform  $paymentPlatform
     * @return \Illuminate\Http\Response
     */
    public function delete($payment_platform_id)
    {
        if ( !$payment_platform=PaymentPlatform::find($payment_platform_id) ) {
            return response()->json([
                'code' => HStatusHttp::NOT_FOUND,
                'message' => 'Plataforma de Pago no encontrada'
            ]);            
        }
        
        $payment_platform->delete();

        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'message' => trans('payment_platform.deleted')
            ]
        ]);
    }
}
