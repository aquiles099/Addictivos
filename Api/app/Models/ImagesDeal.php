<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Helpers\HPath;
use App\Jobs\SaveImage;
use App\Jobs\GetImages;
use Illuminate\Support\Facades\Log;

class ImagesDeal extends Model
{
    protected $fillable = [
        'avatar_file_name',
        'deal_id'
    ]; 

    public static function saveImagesDeal($images, $deal_id) {
        $all_images_deals = [];
        $new_images_deals = [];
        $already_store_images_deals = [];
        $full_path = 'public/' . HPath::AVATAR_DEAL . '/'. $deal_id;
        foreach($images as $key => $image) {
            if(!$image->id){
                $image_path = SaveImage::dispatchNow($image->avatar, $full_path);  
                $image_deal_data = [
                    'avatar_file_name' => $image_path,
                    'deal_id' => $deal_id
                ];
                array_push($new_images_deals, ImagesDeal::create($image_deal_data));
            } else {
                array_push($already_store_images_deals, $image);
            }

        }
        $images = GetImages::dispatchNow($images); 
        array_push($all_images_deals, $new_images_deals, $already_store_images_deals);
        return $all_images_deals;
    }
    
    public static function getSingleImageDeals( $deal ){
        $deal->images = ImagesDeal::query()
        ->where('images_deals.deal_id', '=', $deal->id)
        ->select('id', 'avatar_file_name')
        ->get();
        $deal->images = GetImages::dispatchNow($deal->images); 
        
        return $deal;
    }

    public static function getImageDeals( $deals ){

        foreach( $deals as $deal ) {
            $deal = ImagesDeal::getSingleImageDeals($deal);
        }
        
        return $deals;
    }

    public static function deleteAllImagesFromDeal( $deal ){

        ImagesDeal::query()
            ->where('images_deals.deal_id', '=', $deal->id)
            ->delete();
        
    }
}
