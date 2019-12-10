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

    public static function rules() {
        return [
            'user_card_id' => 'required',
            'deal_id' => 'required',
            'branch_id' => 'required',
            'option_pricing_id' => 'required',
            'quantity' => 'required|numeric',
            'user_id' => 'required',
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
        return $this->hasOne(optionPricing::class);
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
