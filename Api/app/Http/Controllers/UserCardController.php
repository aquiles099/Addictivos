<?php

namespace App\Http\Controllers;

use App\Models\UserCard;
use Illuminate\Http\Request;
use App\Helpers\HStatusHttp;

class UserCardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($user_id)
    {
        $user_cards = UserCard::select('*')
        ->where('user_cards.user_id', '=', $user_id)
        ->get();;
        
        foreach ($user_cards as $user_card) {
            $user_card->card_type = UserCard::getCardTypeString($user_card->card_type);
        }
        
        $data = [
            'code' => HStatusHttp::OK,
            'data' => [
                'user_cards' => $user_cards
            ]
        ];
        
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function prepareCreateOrUpdateData(Request $request, $user_id, $user_card_id = null)
    {
        if($user_card_id) {
            if ( !$user_card=UserCard::find($user_card_id) ) {
                return response()->json([
                    'code' => HStatusHttp::NOT_FOUND,
                    'message' => 'Opcion de precio no encontrada'
                ]);            
            }   
        }

        if( $validator_result = $this->validateData( $request, UserCard::rules(), trans('validation') )) {
            return $validator_result;  
        }

        $user_card_data = [
            'user_id' => $user_id,
            'card_number' => $request->card_number,
            'card_type' => $request->card_type,
            'card_status' => $request->card_status,
            'card_token' => $request->card_token,
            'card_expiration_date' => $request->card_expiration_date
        ];

        if(!$user_card_id){
            $user_card = $this->create($user_card_data);
        } else {
            $user_card = $this->update($user_card, $user_card_data);
        }

        $user_card->card_type = UserCard::getCardTypeString($user_card->card_type);
        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'user_card' => $user_card
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create($user_card)
    {
        return  UserCard::create($user_card);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\user_card  $user_card
     * @return \Illuminate\Http\Response
     */
    public function get($user_id, $user_card_id)
    {
        if ( !$user_card=UserCard::find($user_card_id) ) {
            return response()->json([
                'code' => HStatusHttp::NOT_FOUND,
                'message' => 'Tarjeta no encontrado'
            ]);            
        }
        $user_card->card_type = UserCard::getCardTypeString($user_card->card_type);

        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'user_card' => $user_card
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\user_card  $user_card
     * @return \Illuminate\Http\Response
     */
    public function update($user_card, $user_card_data)
    {
        $user_card->fill($user_card_data)->save();
        return $user_card;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\user_card  $user_card
     * @return \Illuminate\Http\Response
     */
    public function delete($user_id, $user_card_id )
    {

        if ( !$user_card=UserCard::find($user_card_id) ) {
            return response()->json([
                'code' => HStatusHttp::NOT_FOUND,
                'message' => 'Tarjeta no encontrado'
            ]);            
        }
        
        $user_card->delete();

        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'message' => trans('user_card.deleted')
            ]
        ]);
    }
}
