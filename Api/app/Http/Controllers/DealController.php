<?php

namespace App\Http\Controllers;

use App\Models\Deal;
use App\Models\ImagesDeal;
use App\Models\Category;
use App\Models\DealType;
use Illuminate\Http\Request;
use App\Helpers\HStatusHttp;
use App\Helpers\HPath;
use Image;
use File;
use Storage;
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
            // 'images_deals_id' => $request->main_image ? $request->main_image : null,
            'effective_date' => $request->effective_date,
            'deal_total_limit' => 0,
            'user_purchase_limit' => 0,
            'short_description' => $request->short_description,
            'long_description' => $request->long_description,
            'restrictions' => $request->restrictions,
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
            'commission' => $request->commission,
            'seller_id' => 1,
            'deal_type_id' => $request->deal_type_id,
            'company_id' => $request->company_id,
            'commerce_id' => $request->commerce_id,
            'category_id' => $request->category_id
        ];
        $images = [];
        if($request->main_image){
            array_push($images, $request->main_image);
        }
        if($request->images) {
            foreach ($request->images as $key => $image) {
                array_push($images,$image);
            }
        }
        
        if(!$deal_id){
            $deal = $this->create($deal_data, $images);
        } else {
            $deal = $this->update($deal, $deal_data, $images);
        }

        // $deal->category = Category::getCategoryName($deal->category_id);

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
        $full_path = "images/".HPath::AVATAR_DEAL . '/'. $deal->id.'/';
        if(!is_dir($full_path)) {
            mkdir($full_path, 0755, true);
        }
        $images_deal=[];
        foreach($images as $key => $image) {
            $filename = uniqid().'-'.time().'.'. $image->getClientOriginalExtension();            
            Image::make($image)->save(public_path($full_path . $filename));
            $image_deal=ImagesDeal::create([
                'avatar_file_name' => public_path($full_path . $filename),
                'deal_id' => $deal->id
            ]);
            array_push($images_deal,$image_deal);
        }
        if(!$deal->images_deals_id&&count($images_deal)>0) {
            $deal->images_deals_id = $images_deal[0]->id;
            $deal->update();
        }
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
        
        $deal->fill($deal_data)->update();
        $full_path = "images/".HPath::AVATAR_DEAL . '/'. $deal->id.'/';
        $imagesDeal=ImagesDeal::where("deal_id",$deal->id)->get();
        //se eliminan las que ya estaban registradas con el $deal->id
        foreach ($imagesDeal as $key => $imageDeal) {
            File::Delete($imageDeal->avatar_file_name);// se elimina del disco
            if($deal->images_deals_id==$imageDeal->id){
                $deal->images_deals_id=null;
                $deal->update();
            }
            $imageDeal->delete();
        }
        if(!is_dir($full_path)) {
            mkdir($full_path, 0755, true);
        }
        $images_deal=[];
        foreach($images as $key => $image) {
            $filename = uniqid().'-'.time().'.'. $image->getClientOriginalExtension();            
            Image::make($image)->save(public_path($full_path . $filename));
            $image_deal=ImagesDeal::create([
                'avatar_file_name' => public_path($full_path . $filename),
                'deal_id' => $deal->id
            ]);
            array_push($images_deal,$image_deal);
        }
        if(!$deal->images_deals_id&&count($images_deal)>0) {
            $deal->images_deals_id = $images_deal[0]->id;
            $deal->update();
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

    public function types(){
        $types = DealType::select('id','name')
        ->get();

        $data = [
            'code' => HStatusHttp::OK,
            'data' => [
                'types' => $types
            ]
        ];
        
        return response()->json($data);
    }

    public function dealsCliente(){
        $now = date('Y-m-d');
        $deals = Deal::where('effective_date','<',$now)
            ->where('closing_date','>',$now)
            ->where('is_public',1)
            ->whereHas('optionPricings',function($query){
                $query->wherenotnull('deal_id');
            })
            ->select(
                'id','short_title','long_title','effective_date', 
                'deal_total_limit','user_purchase_limit','short_description',
                'long_description', 'restrictions', 'closing_date', 'is_public', 
                'available_until','gift_title', 'user_gift_limit', 'discount', 
                'payment_type', 'commission', 'images_deals_id', 'category_id',
                'company_id','commerce_id','deal_type_id')
            ->get();
        $data = [
            'code' => HStatusHttp::OK,
            'data' => [
                'deals' => $deals
            ]
        ];        
        return response()->json($data);
    }
    

}
