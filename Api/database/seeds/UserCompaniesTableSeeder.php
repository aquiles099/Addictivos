<?php

use Illuminate\Database\Seeder;
use App\Models\UserCompany;

class UserCompaniesTableSeeder extends Seeder
{
    public function getData() {
        return $data = [
            [
                'user_id' => 1,
                'company_id' => 1,
            ],
            [
                'user_id' => 2,
                'company_id' => 1,
            ],
            [
                'user_id' => 3,
                'company_id' => 1,
            ],
            [
                'user_id' => 4,
                'company_id' => 1,
            ],
            [
                'user_id' => 5,
                'company_id' => 1,
            ]
        ];
    }
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        foreach ($this->getData() as $data) {
            UserCompany::create($data);
        }
    }
}
