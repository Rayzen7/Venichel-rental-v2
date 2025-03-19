<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::insert([
            [
                'name' => 'admin1',
                'username' => 'admin1',
                'password' => bcrypt('admin1'),
                'email' => 'admin1@gmail.com',
                'role_id' => 1,
                'no_ktp' => "-",
                'date_of_birth' => "-",
                'description' => "-",
                'phone' => "-",
            ]
        ]);
    }
}
