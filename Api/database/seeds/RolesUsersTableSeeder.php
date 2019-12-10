<?php

use Illuminate\Database\Seeder;
use App\Models\RoleUser;

class RolesUsersTableSeeder extends Seeder
{
    private function getData(){
        return [
            [
                'user_id' => '1',
                'role_id' => '1'
            ],
            [
                'user_id' => '2',
                'role_id' => '2'
            ],
            [
                'user_id' => '3',
                'role_id' => '3'
            ],
            [
                'user_id' => '4',
                'role_id' => '4'
            ],
            [
                'user_id' => '5',
                'role_id' => '5'
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
        foreach($this->getData() as $data){
            RoleUser::create($data);
        }
    }
}
