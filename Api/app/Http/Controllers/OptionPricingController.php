<?php

namespace App\Http\Controllers;

use App\Models\OptionPricing;
use Illuminate\Http\Request;
use App\Helpers\HStatusHttp;

class OptionPricingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($deal_id)
    {
        $option_pricing = OptionPricing::select('*')
        ->where('option_pricings.deal_id', '=', $deal_id)
        ->get();

        $data = [
            'code' => HStatusHttp::OK,
            'data' => [
                'option_pricing' => $option_pricing
            ]
        ];
        
        return response()->json($data);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllOptionPrices()
    {
        $option_pricing = OptionPricing::all();

        $data = [
            'code' => HStatusHttp::OK,
            'data' => [
                'option_pricing' => $option_pricing
            ]
        ];
        
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function prepareCreateOrUpdateData(Request $request, $deal_id, $option_price_id = null)
    {
        if($option_price_id) {
            if ( !$option_price=OptionPricing::find($option_price_id) ) {
                return response()->json([
                    'code' => HStatusHttp::NOT_FOUND,
                    'message' => 'Opcion de precio no encontrada'
                ]);            
            }   
        }

        if( $validator_result = $this->validateData( $request, OptionPricing::rules(), trans('validation') )) {
            return $validator_result;  
        }

        $option_price_data = [
            'original' => $request->original,
            'discount' => $request->discount,
            'limit' => $request->limit,
            'description' => $request->description,
            'efective_date' => $request->efective_date,
            'closing_date' => $request->closing_date,
            'status' => $request->status,
            'deal_id' => $deal_id,
            'user_purchase_limit' => $request->user_purchase_limit,
            'user_purchase_gift_limit' => $request->user_purchase_gift_limit,
            'courtesy' => $request->courtesy,
            'purchase_activation' => $request->purchase_activation
        ];

        if(!$option_price_id){
            $option_price = $this->create($option_price_data);
        } else {
            $option_price = $this->update($option_price, $option_price_data);
        }

        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'option_price' => $option_price
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create($option_price_data)
    {
        return  OptionPricing::create($option_price_data);        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\OptionPricing  $OptionPricing
     * @return \Illuminate\Http\Response
     */
    public function get($deal_id, $option_price_id)
    {
        if ( !$option_price=OptionPricing::find($option_price_id) ) {
            return response()->json([
                'code' => HStatusHttp::NOT_FOUND,
                'message' => 'Opcion de precio no encontrada'
            ]);            
        }
        
        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'option_price' => $option_price
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\OptionPricing  $OptionPricing
     * @return \Illuminate\Http\Response
     */
    public function update($option_price, $option_price_data)
    {
        $option_price->fill($option_price_data)->save();
        return $option_price;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\OptionPricing  $OptionPricing
     * @return \Illuminate\Http\Response
     */
    public function delete($deal_id, $option_price_id)
    {
        if ( !$option_price=OptionPricing::find($option_price_id) ) {
            return response()->json([
                'code' => HStatusHttp::NOT_FOUND,
                'message' => 'Opcion de precio no encontrada'
            ]);            
        }
        
        $option_price->delete();

        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'message' => trans('option_price.deleted')
            ]
        ]);
    }
}
