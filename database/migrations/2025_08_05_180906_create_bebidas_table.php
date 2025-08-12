<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('bebidas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 100);
            $table->decimal('precio', 10, 2);
            $table->integer('stock')->default(0);
            $table->string('imagen', 255)->nullable();
            $table->boolean('estado')->default(true);
            $table->timestamps(); // Recomendado para tener fecha de creación y actualización
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bebidas');
    }
};
