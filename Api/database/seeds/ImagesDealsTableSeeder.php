<?php

use Illuminate\Database\Seeder;
use App\Models\ImagesDeal;

class ImagesDealsTableSeeder extends Seeder
{
    private function getData(){
        return [
            [
                'avatar_file_name' => 'public/deal/1/1.jpg',
                'deal_id' => '1'
            ],
            [
                'avatar_file_name' => 'public/deal/2/2.jpg',
                'deal_id' => '2'
            ],
            [
                'avatar_file_name' => 'public/deal/3/3.jpg',
                'deal_id' => '3'
            ],
            [
                'avatar_file_name' => 'public/deal/4/4.jpg',
                'deal_id' => '4'
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
            ImagesDeal::create($data);
        }
    }
}
