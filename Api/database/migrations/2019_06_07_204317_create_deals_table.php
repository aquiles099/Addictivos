<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDealsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deals', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('short_title');
            $table->string('long_title',300);
            $table->bigInteger('images_deals_id')->unsigned()->nullable();
            $table->timestamp('effective_date')->nullable();
            $table->integer('deal_total_limit');
            $table->integer('user_purchase_limit');
            $table->string('short_description',400);
            $table->text('long_description');
            $table->string('restrictions');
            $table->bigInteger('commerce_id')->unsigned();
            $table->bigInteger('category_id')->unsigned();
            $table->string('slug');
            $table->timestamp('closing_date')->nullable();
            $table->boolean('is_public');
            $table->timestamp('available_until')->nullable();
            $table->string('gift_title');
            $table->integer('user_gift_limit');
            $table->float('discount');
            $table->boolean('images_deal');
            $table->string('payment_type');
            $table->bigInteger('deal_type_id')->unsigned();
            $table->double('commission');
            $table->bigInteger('seller_id')->unsigned()->nullable();

            $table->timestamps();

            $table->foreign('commerce_id')->references('id')->on('commerces')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('deal_type_id')->references('id')->on('deal_types')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('seller_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deals');
    }
}
