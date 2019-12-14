<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\OptionPricing;
use App\Models\ImagesDeal;
use Storage;
use App\Jobs\GetImages;

class Deal extends Model
{
    protected $fillable = [
        'short_title',
        'long_title',
        'images_deals_id',
        'effective_date',
        'deal_total_limit',
        'user_purchase_limit',
        'short_description',
        'long_description',
        'restrictions',
        'commerce_id',
        'category_id',
        'slug',
        'closing_date',
        'is_public',
        'available_until',
        'gift_title',
        'user_gift_limit',
        'discount',
        'images_deal',
        'payment_type',
        'deal_type_id',
        'commission',
        'seller_id',
        'company_id'
    ];

    protected $with = [
        'optionPricings'
    ];

    public static function rules () {
        return [
            'short_title' => 'required|string',
            'long_title' => 'required|string',
         //   'avatar' => 'required|image',
            'effective_date' => 'required',
          //  'deal_total_limit' => 'required|numeric',
          //  'user_purchase_limit' => 'required|numeric',
            'short_description' => 'required|string',
            'long_description' => 'required|string',
            'restrictions' => 'required',
            'commerce_id' => 'required',
            'category_id' => 'required',
            'closing_date' => 'required',
            'is_public' => 'required',
            'available_until' => 'required',
            'gift_title' => 'required|string',
          //  'user_gift_limit' => 'required|numeric',
       //     'discount' => 'required|numeric',
          //  'images_deal' => 'required',
            'payment_type' => 'required',
            'deal_type_id' => 'required',
            'commission' => 'required',
            'company_id' => 'required'
        ];
    }

    public function message () {

    }

    public function optionPricings()
    {
        return $this->hasMany(optionPricing::class);
    }

    

    public function Commerce()
    {
        return $this->BelongsTo(Commerce::class);
    }

    public static function getDeals() {
        $deals = Deal::from('deals as d')
            ->select('d.id','d.short_title', 'd.long_title', 'd.effective_date', 'd.deal_total_limit', 'user_purchase_limit',
                'short_description', 'long_description', 'restrictions', 'closing_date', 'is_public', 'available_until',
                'gift_title', 'user_gift_limit', 'discount', 'payment_type', 'commission', 'images_deals_id', 'category_id','company_id','commerce_id','deal_type_id'
            )
            ->get();
            
        $deals = ImagesDeal::getImageDeals($deals);
        foreach ($deals as $deal) {
            $deal->category = Category::getCategoryName($deal->category_id);
        }

        return $deals;
    }


}
