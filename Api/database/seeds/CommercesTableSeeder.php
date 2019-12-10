<?php

use Illuminate\Database\Seeder;
use App\Models\Commerce;

class CommercesTableSeeder extends Seeder
{
    private function getData(){
        return $data = [
            [
                'name' => 'Mística Spa',
                'description' => 
                    'Centro de belleza integral donde recibirás atención personalizada, brindada por un personal idóneo y altamente calificado. En “Mística Spa” podrás encontrar una cantidad de servicios con los que te sentirás como en casa.'
                ,
                'legal_id' => '2080601-1-753134 DV 21',
                'logo_file_name' => '',
                'logo_update_at' => null,
                'web_site' => '',
                'manager_name' => 'Xiomara Marval',
                'phone' => '62823817',
                'cellphone' => '2030340',
                'email' => 'contacto.misticapty@gmail.com',
                'user_id' => 2
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
            Commerce::create($data);
        }
    }
}
