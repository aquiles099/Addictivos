<?php

namespace App\Http\Controllers;

use App\Models\Deal;
use App\Models\ImagesDeal;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Helpers\HStatusHttp;

class DealController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $deals = Deal::getDeals();

        $data = [
            'code' => HStatusHttp::OK,
            'data' => [
                'deals' => $deals
            ]
        ];

        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function prepareCreateOrUpdateData(Request $request, $deal_id = null)
    {
        if($deal_id) {
            if ( !$deal=Deal::find($deal_id) ) {
                return response()->json([
                    'code' => HStatusHttp::NOT_FOUND,
                    'message' => 'Oferta no encontrada'
                ]);            
            }   
        }

        if( $validator_result = $this->validateData( $request, Deal::rules(), trans('validation') )) {
            return $validator_result;  
        }

        $deal_data = [
            'short_title' => $request->short_title,
            'long_title' => $request->long_title,
      //     'images_deals_id' => $request->main_image->id ? $request->main_image->id : null,
            'images_deals_id' => null,
            'effective_date' => $request->effective_date,
            'deal_total_limit' => 0,
            'user_purchase_limit' => 0,
            'short_description' => $request->short_description,
            'long_description' => $request->long_description,
            'restrictions' => $request->restrictions,
            'commerce_id' => $request->commerce_id,
            'category_id' => $request->category_id,
            'slug' => '',
            'closing_date' => $request->closing_date,
            'is_public' => $request->is_public,
            'available_until' => $request->available_until,
            'gift_title' => $request->gift_title,
            'user_gift_limit' => $request->user_gift_limit ? $request->user_gift_limit->id: 0,
            'discount' => $request->discount ? $request->discount->id: 0,
            'images_deal' => 1,
            //'images_deal' => $request->images_deal,
            'payment_type' => $request->payment_type,
            'deal_type_id' => $request->deal_type_id,
            'commission' => $request->commission,
            'seller_id' => 1,
            'company_id' => $request->company_id
        ];
        $images = [];
        array_push($images, $request->main_image);
        if($request->images) {
            array_push($images,$request->images);
        }
        
        if(!$deal_id){
            $deal = $this->create($deal_data, $images);
        } else {
            $deal = $this->update($deal, $deal_data);
        }

        $deal->category = Category::getCategoryName($deal->category_id);

        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'deal' => $deal
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create($deal_data, $images)
    {
        $deal = Deal::create($deal_data);
        // $images_deal = ImagesDeal::saveImagesDeal($images, $deal->id);
        // if(!$deal->images_deals_id){
        //     $deal->images_deals_id = $images_deal[0]->id;
        //     $deal->save();
        // }
        // $deal->images = $images_deal;
        return $deal;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Deal  $deal
     * @return \Illuminate\Http\Response
     */
    public function get($deal_id)
    {
        if ( !$deal=Deal::find($deal_id) ) {
            return response()->json([
                'code' => HStatusHttp::NOT_FOUND,
                'message' => 'Oferta no encontrada'
            ]);            
        }

        $deal = ImagesDeal::getSingleImageDeals($deal);
        
        $deal->category = Category::getCategoryName($deal->category_id);

        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'deal' => $deal
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Deal  $deal
     * @return \Illuminate\Http\Response
     */
    public function update($deal, $deal_data, $images)
    {
        $deal->fill($deal_data)->save();
        $images_deal = ImagesDeal::saveImagesDeal($images, $deal->id);
        if(!$deal->images_deals_id) {
            $deal->images_deals_id = $images_deal[0]->id;
            $deal->save();
        }
        return $deal;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Deal  $deal
     * @return \Illuminate\Http\Response
     */
    public function delete($deal_id)
    {

        if ( !$deal=Deal::find($deal_id) ) {
            return response()->json([
                'code' => HStatusHttp::NOT_FOUND,
                'message' => 'Oferta no encontrado'
            ]);            
        }
        
        ImagesDeal::deleteAllImagesFromDeal($deal);
        
        $deal->delete();

        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'message' => trans('deal.deleted')
            ]
        ]);
    }

}
