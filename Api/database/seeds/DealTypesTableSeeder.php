<?php

use Illuminate\Database\Seeder;
use App\Models\DealType;

class DealTypesTableSeeder extends Seeder
{
    private function getData(){
        return [
            [
                'name' =>'Oferta',
                'description' =>'Articulo para la compra directamente en la página'
            ],
            [
                'name' => 'Promoción',
                'description' => 'Articulo que solo se muestra de manera informatica en la página'
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
            DealType::create($data);
        }
    }
}
