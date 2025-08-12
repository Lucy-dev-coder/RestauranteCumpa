<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BebidasSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('bebidas')->insert([
            [
                'nombre' => 'Frutal 1L',
                'precio' => 13.00,
                'stock' => 50,
                'imagen' => 'imagenes/frutall.jpeg',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Frutall Popular',
                'precio' => 9.00,
                'stock' => 50,
                'imagen' => 'imagenes/frutall.jpeg',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            //COCACOLA
            [
                'nombre' => 'Coca Cola 3L (No retorn.)',
                'precio' => 22.00,
                'stock' => 50,
                'imagen' => 'imagenes/coca_cola.webp',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
             [
                'nombre' => 'Coca Cola 2 1/2L (No retorn.)',
                'precio' => 19.00,
                'stock' => 50,
                'imagen' => 'imagenes/coca_cola.webp',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
             [
                'nombre' => 'Coca Cola 2L (No retorn.)',
                'precio' => 17.00,
                'stock' => 50,
                'imagen' => 'imagenes/coca_cola.webp',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

             [
                'nombre' => 'Coca Cola 2L',
                'precio' => 14.00,
                'stock' => 50,
                'imagen' => 'imagenes/coca_cola.webp',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
             [
                'nombre' => 'Coca Cola 1 1/2L',
                'precio' => 12.00,
                'stock' => 50,
                'imagen' => 'imagenes/coca_cola.webp',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
             [
                'nombre' => 'Coca Cola 1L',
                'precio' => 10.00,
                'stock' => 50,
                'imagen' => 'imagenes/coca_cola.webp',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
             [
                'nombre' => 'Coca Cola Popular',
                'precio' => 8.00,
                'stock' => 50,
                'imagen' => 'imagenes/coca_cola.webp',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
               [
                'nombre' => 'Coca Cola Personal',
                'precio' => 3.00,
                'stock' => 50,
                'imagen' => 'imagenes/coca_cola.webp',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            //FANTA
[
                'nombre' => 'Coca Cola 3L (No retorn.)',
                'precio' => 22.00,
                'stock' => 50,
                'imagen' => 'imagenes/fanta.webp',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
             [
                'nombre' => 'Coca Cola 2 1/2L (No retorn.)',
                'precio' => 19.00,
                'stock' => 50,
                'imagen' => 'imagenes/fanta.webp',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
             [
                'nombre' => 'Coca Cola 2L (No retorn.)',
                'precio' => 17.00,
                'stock' => 50,
                'imagen' => 'imagenes/fanta.webp',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

             [
                'nombre' => 'Coca Cola 2L',
                'precio' => 14.00,
                'stock' => 50,
                'imagen' => 'imagenes/fanta.webp',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
             [
                'nombre' => 'Coca Cola 1 1/2L',
                'precio' => 12.00,
                'stock' => 50,
                'imagen' => 'imagenes/fanta.webp',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
             [
                'nombre' => 'Coca Cola 1L',
                'precio' => 10.00,
                'stock' => 50,
                'imagen' => 'imagenes/fanta.webp',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
             [
                'nombre' => 'Coca Cola Popular',
                'precio' => 8.00,
                'stock' => 50,
                'imagen' => 'imagenes/fanta.webp',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
               [
                'nombre' => 'Coca Cola Personal',
                'precio' => 3.00,
                'stock' => 50,
                'imagen' => 'imagenes/fanta.webp',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            //CERVEZA
  [
                'nombre' => 'Cerveza Huari',
                'precio' => 15.00,
                'stock' => 50,
                'imagen' => 'imagenes/huari.webp',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
             [
                'nombre' => 'Cerveza Paceña',
                'precio' => 22.00,
                'stock' => 50,
                'imagen' => 'imagenes/paceña.jpg',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
             [
                'nombre' => 'Cerveza Inca',
                'precio' => 20.00,
                'stock' => 50,
                'imagen' => 'imagenes/inca.jpg',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
