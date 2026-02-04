<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'a@a.com',
            'phone' => '11111111111',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'User',
            'email' => 'u@u.com',
            'phone' => '081234567890',
            'password' => bcrypt('password'),
            'role' => 'user',
        ]);
        $this->command->info("UserSeeder: Berhasil membuat " . count(User::all()) . " user.");
    }
}
