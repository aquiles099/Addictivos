<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommercesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('commerces', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('name');
            $table->string('description',250);
            $table->string('legal_id');
            $table->string('logo_file_name');
            $table->timestamp('logo_update_at')->nullable();
            $table->string('web_site');
            $table->string('manager_name');
            $table->string('phone');
            $table->string('cellphone');
            $table->string('email');
            $table->bigInteger('user_id')->unsigned();

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')
            ->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('commerces');
    }
}
