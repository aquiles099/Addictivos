<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    private function getData() {
        return $data = [
            [
                'name' => 'root',
                'last_name' => Str::random(10),
                'email' => 'root@mail.com',
                'password' => bcrypt('12345678'),
                'dni' => '12345678',
                'phone' => '02869548453',
                'username' => 'root',
                'address' => Str::random(10),
                'policy' => 'E-10215521',
                'policy_date_end' => carbon::now()->addMonths(5),
                'avatar_file_name' => ''
            ],
            [
                'name' => 'juan',
                'last_name' => Str::random(10),
                'email' => 'admin@mail.com',
                'password' => bcrypt('12345678'),
                'dni' => '12345678',
                'phone' => '02869548453',
                'username' => 'admin',
                'address' => Str::random(10),
                'policy' => 'E-10215521',
                'policy_date_end' => carbon::now()->addMonths(5),
                'avatar_file_name' => ''
            ],
            [
                'name' => 'alberto',
                'last_name' => Str::random(10),
                'email' => 'commerce@mail.com',
                'password' => bcrypt('12345678'),
                'dni' => '12345678',
                'phone' => '02869548453',
                'username' => 'commerce',
                'address' => Str::random(10),
                'policy' => 'E-102155212',
                'policy_date_end' => carbon::now()->addMonths(5),
                'avatar_file_name' => ''
            ],
            [
                'name' => 'pedro',
                'last_name' => Str::random(10),
                'email' => 'employ@mail.com',
                'password' => bcrypt('12345678'),
                'dni' => '12345678',
                'phone' => '02869548453',
                'username' => 'employ',
                'address' => Str::random(10),
                'policy' => 'E-102155213',
                'policy_date_end' => carbon::now()->addMonths(5),
                'avatar_file_name' => ''
            ],
            [
                'name' => 'jorge',
                'last_name' => Str::random(10),
                'email' => 'client@mail.com',
                'password' => bcrypt('12345678'),
                'dni' => '12345678',
                'phone' => '02869548453',
                'username' => 'client',
                'address' => Str::random(10),
                'policy' => 'E-102155214',
                'policy_date_end' => carbon::now()->addMonths(5),
                'avatar_file_name' => ''
            ]
        ];
    }
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->getData() as $data) {
            User::create($data);
        }
    }
}
