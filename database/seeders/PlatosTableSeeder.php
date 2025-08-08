<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlatosTableSeeder extends Seeder
{
    public function run(): void
    {
        // Obtener IDs de categorías
        $categorias = DB::table('categorias')->pluck('id', 'nombre');

        DB::table('platos')->insert([
            [
                'nombre' => 'Ensalada mixta',
                'precio' => 15.00,
                'imagen' => null,
                'estado' => true,
                'categoria_id' => $categorias['Entradas'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Pollo a la brasa',
                'precio' => 35.00,
                'imagen' => null,
                'estado' => true,
                'categoria_id' => $categorias['Platos Principales'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Costillas BBQ',
                'precio' => 45.00,
                'imagen' => null,
                'estado' => true,
                'categoria_id' => $categorias['Parrillas'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Jarra de Mocochinchi',
                'precio' => 12.00,
                'imagen' => null,
                'estado' => true,
                'categoria_id' => $categorias['Bebidas'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Helado de vainilla',
                'precio' => 10.00,
                'imagen' => null,
                'estado' => true,
                'categoria_id' => $categorias['Postres'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
