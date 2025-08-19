<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('movimientos_bebidas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bebida_id')->constrained('bebidas')->onDelete('cascade'); // Relación con bebidas
            $table->enum('tipo', ['entrada', 'salida']); // entrada = aumento, salida = reducción
            $table->integer('cantidad'); // cantidad movida
            $table->integer('stock_anterior'); // stock antes del movimiento
            $table->integer('stock_nuevo'); // stock después del movimiento
            $table->string('motivo', 255)->nullable(); // opcional (ej: compra, ajuste, pérdida, etc.)
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('movimientos_bebidas');
    }
};
