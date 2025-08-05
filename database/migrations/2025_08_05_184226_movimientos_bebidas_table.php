<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('movimientos_bebidas', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('bebida_id')->nullable();
            $table->foreign('bebida_id')
                ->references('id')
                ->on('bebidas')
                ->onDelete('set null');

            $table->enum('tipo', ['ingreso', 'egreso']);
            $table->integer('cantidad');

            $table->timestamps(); // Fecha y hora del movimiento
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('movimientos_bebidas');
    }
};
