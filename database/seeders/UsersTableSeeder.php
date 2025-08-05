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
                'activo' => true,
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cajero 1',
                'email' => 'cajero@gmail.com',
                'password' => Hash::make('cajero'),
                'rol' => 'cajero',
                'activo' => true,
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cajero Inactivo',
                'email' => 'inactivo@restaurante.com',
                'password' => Hash::make('inactivo123'),
                'rol' => 'cajero',
                'activo' => false,
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
