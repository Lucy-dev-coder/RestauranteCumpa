<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriasTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categorias')->insert([
            ['nombre' => 'Entradas', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Platos Principales', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Parrillas', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Bebidas', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Postres', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
