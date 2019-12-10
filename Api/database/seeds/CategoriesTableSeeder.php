<?php

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesTableSeeder extends Seeder
{
    private function getData(){
        return [
            [
                'slug' => 'restaurante',
                'title' => 'Restaurante',
                'icon_class' => 'fa fa-utensils'
            ],
            [
                'slug' => 'belleza',
                'title' => 'Belleza',
                'icon_class' => 'fa fa-heartbeat'
            ],
            [
                'slug' => 'turismo',
                'title' => 'Turismo',
                'icon_class' => 'fa fa-ship'
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
            Category::create($data);
        }
    }
}
