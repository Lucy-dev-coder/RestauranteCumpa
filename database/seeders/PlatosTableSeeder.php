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
                'nombre' => 'Chuleta de cerdo',
                'precio' => 35.00,
                'imagen' => 'imagenes/chuleta_de_cerdo.jpg',
                'estado' => true,
                'categoria_id' => $categorias['Platos principales'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),

            ],
            [
                'nombre' => 'Chuleta de res',
                'precio' => 35.00,
                'imagen' => 'imagenes/chuleta_de_res.jpg',
                'estado' => true,
                'categoria_id' => $categorias['Platos principales'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Chorizo',
                'precio' => 35.00,
                'imagen' => 'imagenes/chorizo.jpg',
                'estado' => true,
                'categoria_id' => $categorias['Platos principales'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),

            ],
            [
                'nombre' => 'Pollo',
                'precio' => 35.00,
                'imagen' => 'imagenes/pollo.jpg',
                'estado' => true,
                'categoria_id' => $categorias['Platos principales'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),

            ],
            //PLATOS EXTRAS
            [
                'nombre' => 'Cerdo + Chorizo',
                'precio' => 45.00,
                'imagen' => 'imagenes/cerdo_chorizo.jpg',
                'estado' => true,
                'categoria_id' => $categorias['Extras'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Res + Pollo',
                'precio' => 52.00,
                'imagen' => 'imagenes/res_pollo.jpg',
                'estado' => true,
                'categoria_id' => $categorias['Extras'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Cerdo + Res + Chorizo',
                'precio' => 62.00,
                'imagen' => 'imagenes/cerdo_res_chorizo.jpg',
                'estado' => true,
                'categoria_id' => $categorias['Extras'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Cerdo + Res + Pollo + Chorizo',
                'precio' => 79.00,
                'imagen' => 'imagenes/cerdo_res_pollo_chorizo.jpg',
                'estado' => true,
                'categoria_id' => $categorias['Extras'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Cerdo + Res + Pollo + 2 Chorizos',
                'precio' => 90.00,
                'imagen' => 'imagenes/cerdo_res_pollo_2chorizo.jpg',
                'estado' => true,
                'categoria_id' => $categorias['Extras'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            //PORCIONES
            [
                'nombre' => 'Ensalada',
                'precio' => 12.00,
                'imagen' => 'imagenes/ensalada.jpg',
                'estado' => true,
                'categoria_id' => $categorias['Porciones'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Papas',
                'precio' => 12.00,
                'imagen' => 'imagenes/papas.jpg',
                'estado' => true,
                'categoria_id' => $categorias['Porciones'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Arroz',
                'precio' => 12.00,
                'imagen' => 'imagenes/arroz.jpg',
                'estado' => true,
                'categoria_id' => $categorias['Porciones'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // CARNES SUELTAS

            [
                'nombre' => 'Chorizo',
                'precio' => 12.00,
                'imagen' => 'imagenes/S_chorizo.jpg',
                'estado' => true,
                'categoria_id' => $categorias['Carnes Sueltas'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Pollo',
                'precio' => 18.00,
                'imagen' => 'imagenes/S_pollo.jpg',
                'estado' => true,
                'categoria_id' => $categorias['Carnes Sueltas'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Res',
                'precio' => 18.00,
                'imagen' => 'imagenes/S_res.jpg',
                'estado' => true,
                'categoria_id' => $categorias['Carnes Sueltas'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Cerdo',
                'precio' => 18.00,
                'imagen' => 'imagenes/S_cerdo.jpg',
                'estado' => true,
                'categoria_id' => $categorias['Carnes Sueltas'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ],

        ]);
    }
}
