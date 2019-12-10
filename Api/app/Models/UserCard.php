<?php

namespace App\Models;
use App\Helpers\HCardType;

use Illuminate\Database\Eloquent\Model;

class UserCard extends Model
{
    protected $fillable = [
        'user_id',
        'card_number',
        'card_type',
        'card_status',
        'card_token',
        'card_expiration_date'
    ];

    public static function rules () {
        return [
            'card_number' => 'required|numeric',
            'card_type' => 'required',
            'card_status' => 'required',
            'card_token' => 'required',
            'card_expiration_date' => 'required'

        ];
    }

    public static function getAllcardsFromUser($user){
        $user_cards = UserCard::where('user_cards.user_id', '=', $user->id)
        ->select('*')
        ->get();
    }

    public static function getCardTypeString($card_type){
        switch ($card_type) {
            case HCardType::VISA_CODE:
                $card_type_string = HCardType::VISA_STRING;
                break;
            
            case HCardType::MASTERCARD_CODE:
                $card_type_string = HCardType::MASTERCARD_STRING;
                break;
            case HCardType::AMERICAN_EXPRESS_CODE:
                $card_type_string = HCardType::AMERICAN_EXPRESS_STRING;
                break;
        }
        return $card_type_string;
    }
}
