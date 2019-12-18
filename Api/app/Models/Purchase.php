<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    protected $fillable = [
        'user_id',
        'deal_id',
        'quantity',
        'unit_price',
        'subtotal',
        'total',
        'saleman_id',
        'order_key',
        'beneficiary_name',
        'beneficiary_email',
        'beneficiary_note',
        'is_claimed',
        'claimed_at',
        'status',
        'option_pricing_id',
        'quantity_reclaimed',
        'quantity_gift',
        'discount',
        'user_card_id',
        'so',
        'version',
        'ip',
        'navigator',
        'branch_id',
        'payment_platform_id',
        'transaction_type'
    ];

    public static function rules($id = null, array $data = []) {
        $deal = Deal::find($data['deal_id']);
        \Validator::extend('dealsTotalLimit', function ($attribute, $value, $parameters) use ($deal) {
            if (!$deal) {
                return null; // no limit so anything is accepted
            }
            if (intval($deal->deal_total_limit) === 0) {
                return true; // no limit so anything is accepted
            }
            $totalPurchases = intval($value) + Purchase::where('deal_id','=',$deal->id)->sum('quantity');
            return $totalPurchases <= $deal->deal_total_limit;
        });
        $optionPricing= OptionPricing::find($data['option_pricing_id']);
        \Validator::extend('optionPricingTotalLimit', function ($attribute, $value, $parameters) use ($optionPricing) {
            if (!$optionPricing) {
                return null; // no limit so anything is accepted
            }
            if (intval($optionPricing->limit) === 0) {
                return true; // no limit so anything is accepted
            }
            $totalPurchases = intval($value) + Purchase::where('deal_id','=',$optionPricing->deal->id)->where('option_pricing_id','=',$optionPricing->id)->sum('quantity');
            return $totalPurchases <= $optionPricing->limit;
        });        
        return [
            'user_id' => 'required',
            'deal_id' => 'required|integer|exists:deals,id|exists:option_pricings,deal_id',
            'quantity' => 'required|integer|min:1|dealsTotalLimit|optionPricingTotalLimit',
            'option_pricing_id' => 'required|integer|exists:option_pricings,id',
            'user_card_id' => 'required',
            'branch_id' => 'required',
            'beneficiary_name' => 'required',
            'beneficiary_email' => 'required',
            'beneficiary_note' => 'required',
            'device' => 'required',
            'so' => 'required',
            'payment_platform_id' => 'required',
            'version' => 'required',
            'ip' => 'required',
            'navigator' => 'required'
        ];
    }

    public function optionPricings()
    {
        return $this->hasOne(OptionPricing::class);
    }

    public function User()
    {
        return $this->BelongsTo(User::class);
    }

    public function Deal()
    {
        return $this->BelongsTo(Deal::class);
    }
}
