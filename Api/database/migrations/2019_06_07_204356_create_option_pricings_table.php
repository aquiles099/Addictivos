<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOptionPricingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('option_pricings', function (Blueprint $table) {
            $table->bigIncrements('id');
            
            $table->double('original');
            $table->double('discount');
            $table->integer('limit');
            $table->string('description',500);
            $table->timestamp('efective_date')->nullable();
            $table->timestamp('closing_date')->nullable();
            $table->integer('status');
            $table->bigInteger('deal_id')->unsigned();
            $table->integer('user_purchase_limit');
            $table->integer('user_purchase_gift_limit');
            $table->integer('courtesy');
            $table->integer('purchase_activation');

            $table->timestamps();

            $table->foreign('deal_id')->references('id')->on('deals')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('option_pricings');
    }
}
