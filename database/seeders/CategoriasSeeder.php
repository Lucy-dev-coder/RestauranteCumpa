<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriasSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categorias')->insert([
            [
                'nombre' => 'Platos principales',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Extras',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            [
                'nombre' => 'Porciones',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Carnes Sueltas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
