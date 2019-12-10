<?php

use Illuminate\Database\Seeder;
use App\Models\Company;

class CompaniesTableSeeder extends Seeder
{
    private function getData(){
        return $data = [
            [
                'business_name' => 'Panama Asistencia',
                'dni'           => '123456',
                'address'       => 'Av Paseo Caroni',
                'email'         => 'panama_asistencia@mail.com',
                'logo'          => '',
                'description'   => 'Compañia Base',
                'phone'         => '12345678',
                'user_id'       => '2'
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
            Company::create($data);
        }   
    }
}
