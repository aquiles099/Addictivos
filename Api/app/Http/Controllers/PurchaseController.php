<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\OptionPricing;
use Illuminate\Http\Request;
use App\Helpers\HStatusHttp;
use App\Helpers\HPaymentStatus;
use App\Helpers\HTransactionType;
use Illuminate\Support\Facades\Mail;
use App\Mail\Purchase as PurchaseEmail;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $purchases = Purchase::all();

        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'purchase' => $purchases
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function prepareCreateOrUpdateData(Request $request, $purchase_id = null)
    {
        if($purchase_id) {
            if ( !$purchase=Purchase::find($purchase_id) ) {
                return response()->json([
                    'code' => HStatusHttp::NOT_FOUND,
                    'message' => 'Compra no encontrada'
                ]);            
            }   
        }

        if( $validator_result = $this->validateData( $request, Purchase::rules(), trans('validation') )) {
            return $validator_result;  
        }

        $unit_price = OptionPricing::getUnitPriceFromOptionPrice($request->option_pricing_id);
        $subtotal = $unit_price * $request->quantity;
        $purchase_data = [
            'user_id' => $request->user_id,
            'deal_id' => $request->deal_id,
            'quantity' => $request->quantity,
            'unit_price' => $unit_price,
            'subtotal' => $subtotal,
            'total' => $subtotal,
            'saleman_id' => 1,
            'order_key' => '',
            'beneficiary_name' => $request->beneficiary_name,
            'beneficiary_email' => $request->beneficiary_email,
            'beneficiary_note' => $request->beneficiary_note,
            'is_claimed' => $request->is_claimed ? $request->is_claimed : '0',
            'claimed_at' => $request->claimed_at ? $request->claimed_at : '2018/10/20',
            'status' => HPaymentStatus::PAID,
            'option_pricing_id' => $request->option_pricing_id,
            'quantity_reclaimed' => $request->quantity_reclaimed ? $request->quantity_reclaimed : '0',
            'quantity_gift' => $request->quantity_gift ? $request->quantity_gift : 0,
            'discount' => '0',
            'user_card_id' => $request->user_card_id,
            'so' => $request->so,
            'version' => $request->version ? $request->version : '' ,
            'ip' => $request->ip,
            'navigator' => $request->navigator,
            'branch_id' => $request->branch_id,
            'payment_platform_id' => $request->payment_platform_id,
            'transaction_type' => $request->transaction_type ? $request->transaction_type : HTransactionType::CREDIT_CARD
        ];

        if(!$purchase_id){
            $purchase = $this->create($purchase_data);
            Mail::to($purchase->user)->send(new PurchaseEmail($purchase));

        } else {
            $purchase = $this->update($purchase, $purchase);
        }

        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'purchase' => $purchase
            ]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function create($purchase_data)
    {
        return  Purchase::create($purchase_data);        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function get($purchase_id)
    {
        if ( !$purchase=Purchase::find($purchase_id) ) {
            return response()->json([
                'code' => HStatusHttp::NOT_FOUND,
                'message' => 'Compra no encontrada'
            ]);            
        }
        
        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'purchase' => $purchase
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function update($puchase, $puchase_data)
    {
        $puchase->fill($puchase_data)->save();
        return $puchase;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function destroy(purchase $purchase)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function changeStatus(Request $request)
    {
        if ( !$purchase=Purchase::find($request->id) ) {
            return response()->json([
                'code' => HStatusHttp::NOT_FOUND,
                'message' => 'Compra no encontrada'
            ]);            
        }
        $purchase->status = $request->status;
        $purchase->save();
        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'purchase' => $purchase
            ]
        ]);
    }
}
