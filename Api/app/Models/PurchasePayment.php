<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PurchasePayment extends Model
{
    protected $fillable = [
        'transaction_id',
        'transaction_date',
        'transaction_status',
        'transaction_description',
        'total_payment',
        'card_type',
        'shopper_email',
        'shopper_name',
        'purchase_id',
        'type_transaction'
    ];
}
