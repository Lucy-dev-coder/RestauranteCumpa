<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('ventas', function (Blueprint $table) {
            $table->id();

            // Caja relacionada - obligatorio, no nullable
            $table->unsignedBigInteger('caja_id');
            $table->foreign('caja_id')
                ->references('id')
                ->on('caja')
                ->onDelete('restrict'); // evita borrar caja con ventas relacionadas

            // Usuario (cajero) - nullable para preservar historial si usuario eliminado
            $table->unsignedBigInteger('usuario_id')->nullable();
            $table->foreign('usuario_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            $table->decimal('total', 10, 2);
            $table->string('mesa', 50)->nullable();
            $table->enum('metodo_pago', ['efectivo', 'qr'])->default('efectivo');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ventas');
    }
};
