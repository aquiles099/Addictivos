<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PurchasePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purchase_payments', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('transaction_id');
            $table->timestamp('transaction_date')->nullable();
            $table->boolean('transaction_status');
            $table->string('transaction_description');
            $table->double('total_payment');
            $table->integer('card_type');
            $table->string('shopper_email');
            $table->string('shopper_name');
            $table->bigInteger('purchase_id')->unsigned();
            $table->integer('type_transaction');

            $table->timestamps();

            $table->foreign('purchase_id')->references('id')->on('purchases')->onUpdate('cascade')->onDelete('cascade');
        });    
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
