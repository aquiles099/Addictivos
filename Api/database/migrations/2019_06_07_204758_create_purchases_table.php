<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePurchasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purchases', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('deal_id')->unsigned();
            $table->integer('quantity');
            $table->double('unit_price');
            $table->double('subtotal');
            $table->double('total');
            $table->bigInteger('saleman_id')->unsigned();
            $table->string('order_key');
            $table->string('beneficiary_name');
            $table->string('beneficiary_email');
            $table->string('beneficiary_note');
            $table->boolean('is_claimed');
            $table->timestamp('claimed_at')->nullable();
            $table->boolean('status');
            $table->bigInteger('option_pricing_id')->unsigned();
            $table->integer('quantity_reclaimed');
            $table->integer('quantity_gift');
            $table->double('discount');
            $table->bigInteger('user_card_id')->unsigned();
            $table->string('so');
            $table->string('version');
            $table->string('ip');
            $table->string('navigator');
            $table->bigInteger('branch_id')->unsigned();
            $table->bigInteger('payment_platform_id')->unsigned();

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('deal_id')->references('id')->on('deals')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('saleman_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('option_pricing_id')->references('id')->on('option_pricings')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('user_card_id')->references('id')->on('user_cards')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('branch_id')->references('id')->on('branches')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('payment_platform_id')->references('id')->on('payment_platforms')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('purchases');
    }
}
