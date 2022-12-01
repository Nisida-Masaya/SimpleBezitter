<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert(
            [
                'name' => 'テスト',
                'email' => 'test@example.com',
                'email_verified_at' => now(),
                'password' => bcrypt('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
        DB::table('users')->insert(
            [
                'name' => '山田',
                'email' => 'yamada@example.com',
                'email_verified_at' => now(),
                'password' => bcrypt('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}
