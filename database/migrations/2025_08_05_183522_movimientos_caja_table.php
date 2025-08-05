<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('movimientos_caja', function (Blueprint $table) {
            $table->id();

            // FK a caja, obligatoria
            $table->unsignedBigInteger('caja_id');
            $table->foreign('caja_id')
                ->references('id')
                ->on('caja')
                ->onDelete('cascade'); 
                // Si se elimina una caja, se borran sus movimientos

            $table->enum('tipo', ['ingreso', 'egreso']);
            $table->text('descripcion');
            $table->decimal('monto', 10, 2);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('movimientos_caja');
    }
};
