<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('detalle_ventas_bebidas', function (Blueprint $table) {
            $table->id();

            // Venta relacionada
            $table->unsignedBigInteger('venta_id');
            $table->foreign('venta_id')
                ->references('id')
                ->on('ventas')
                ->onDelete('restrict');

            // Bebida relacionada
            $table->string('bebida', 100);
            
            $table->unsignedBigInteger('bebida_id');
            $table->foreign('bebida_id')
                ->references('id')
                ->on('bebidas')
                ->onDelete('restrict');

            $table->integer('cantidad');
            $table->decimal('precio_unitario', 10, 2);


            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('detalle_ventas_bebidas');
    }
};
