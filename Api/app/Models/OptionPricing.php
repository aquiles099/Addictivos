<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OptionPricing extends Model
{
    protected $fillable = [
        'original',
        'discount',
        'limit',
        'description',
        'efective_date',
        'closing_date',
        'status',
        'deal_id',
        'user_purchase_limit',
        'user_purchase_gift_limit',
        'courtesy',
        'purchase_activation'
    ];

    public static function rules () {
        return [

            'original' => 'required|numeric',
            'discount' => 'required|numeric',
            'limit' => 'required|numeric',
            'description' => 'required|string',
            'efective_date' => 'required|date',
            'closing_date' => 'required|date',
            'status' => 'required|numeric',
            'deal_id' => 'required',
            'user_purchase_limit' => 'required|numeric',
            'user_purchase_gift_limit' => 'required|numeric',
            'courtesy' => 'required|numeric',
            'purchase_activation' => 'required|numeric'
        
        ];
    }

    public static function getOptionPricingsFromDeals( $deals) {
        foreach ($deals as $deal) {
            $option_pricings = OptionPricing::select('*')
            ->where('option_pricings.deal_id', '=', $deal->id)
            ->get();
            $deal->option_pricins = $option_pricings;
        }
        return $deals;
    }

    public static function getUnitPriceFromOptionPrice($option_price_id){
        $option_price = OptionPricing::find($option_price_id);
        $unit_price = $option_price['original'] * $option_price->discount / 100;
        return $unit_price;
    }
}
