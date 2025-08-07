<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Administrador',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('admin'),
                'rol' => 'admin',
                'estado' => 'habilitado',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cajero 1',
                'email' => 'cajero@gmail.com',
                'password' => Hash::make('cajero'),
                'rol' => 'cajero',
                'estado' => 'habilitado',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cajero Inactivo',
                'email' => 'inactivo@restaurante.com',
                'password' => Hash::make('inactivo123'),
                'rol' => 'cajero',
                'estado' => 'deshabilitado',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
