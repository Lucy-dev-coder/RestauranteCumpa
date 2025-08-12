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
                'name' => 'Juan',
                'email' => 'juan@gmail.com',
                'password' => Hash::make('123456'),
                'rol' => 'admin',
                'estado' => 'habilitado',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Jose',
                'email' => 'jose@gmail.com',
                'password' => Hash::make('123456'),
                'rol' => 'cajero',
                'estado' => 'habilitado',
                'created_at' => now(),
                'updated_at' => now(),
            ],
           
        ]);
    }
}
