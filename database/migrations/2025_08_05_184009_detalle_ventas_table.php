<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('detalle_ventas', function (Blueprint $table) {
            $table->id();

            // Venta asociada - no nullable, evitar borrar ventas con detalles
            $table->unsignedBigInteger('venta_id');
            $table->foreign('venta_id')
                ->references('id')
                ->on('ventas')
                ->onDelete('restrict');

            // Plato como texto (nombre), ya no como clave foránea
            $table->string('plato', 100);

            $table->integer('cantidad');
            $table->decimal('precio_unitario', 10, 2);
            

            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('detalle_ventas');
    }
};
