<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('links', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('short_url', length: 100);
            $table->string('long_url', length: 100);
            $table->timestamp('expired_at', precision: 0);
            $table->softDeletes('deleted_at', precision: 0);

            $table->foreign('user_id')->references('id')->on('users');
        });
        Schema::create('analytics', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('link_id');
            $table->date('date');
            $table->integer('counter');

            $table->unique(['link_id', 'date']);
            $table->foreign('link_id')->references('id')->on('links');
        });
        // TODO: Create foreign key links -> user; analytics -> links
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('analytics');
        Schema::dropIfExists('links');
    }
};
