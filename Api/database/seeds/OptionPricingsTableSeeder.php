<?php

use Illuminate\Database\Seeder;
use App\Models\OptionPricing;
use Carbon\Carbon;

class OptionPricingsTableSeeder extends Seeder
{
    private function getData(){
        return [
            [
                'original' => 110,
                'discount' => 50,
                'limit' => 5,
                'description' => 
                    'Curso de manejo teórico.
                    Prueba práctica para obtener licencia de vehículo (Tipo A-C).
                    Certificado válido por la ATTT para personas que saben conducir.'
                ,
                'efective_date' => carbon::now(),
                'closing_date' => carbon::now()->addMonths(1),
                'status' => 1,
                'deal_id' => 1,
                'user_purchase_limit' => 5,
                'user_purchase_gift_limit' => 5,
                'courtesy' => 0,
                'purchase_activation' => 5
            ],
            [
                'original' => 110,
                'discount' => 41,
                'limit' => 5,
                'description' => 
                    'Prueba práctica para obtener licencia comercial (Tipo A-C-D).
                    Certificado válido por la ATTT para personas que saben conducir.'
                ,
                'efective_date' => carbon::now(),
                'closing_date' => carbon::now()->addMonths(1),
                'status' => 1,
                'deal_id' => 1,
                'user_purchase_limit' => 5,
                'user_purchase_gift_limit' => 5,
                'courtesy' => 0,
                'purchase_activation' => 5
            ],
            [
                'original' => 180,
                'discount' => 43,
                'limit' => 5,
                'description' => 
                    'Paga $78 y no $180 por una noche en una habitación Doble para 2 personas + desayuno estilo americano + cóctel de bienvenida + 1 hora de cancha de tenis.
                    Las habitaciones dobles del Hotel Faranda Guayacanes Chitré son una elección muy recomendable para parejas que quieren descansar cerca del centro de la ciudad. Están equipadas con dos camas, teléfono, cajilla de seguridad, televisión, wifi sin costo adicional y cuarto de baño privado con artículos de aseo.'
                ,
                'efective_date' => carbon::now(),
                'closing_date' => carbon::now()->addMonths(1),
                'status' => 1,
                'deal_id' => 2,
                'user_purchase_limit' => 5,
                'user_purchase_gift_limit' => 5,
                'courtesy' => 0,
                'purchase_activation' => 5
            ],
            [
                'original' => 60,
                'discount' => 50,
                'limit' => 5,
                'description' => 
                    'Paga $30 y no $60 por un desayuno sorpresa que incluye:
Canasta.
Globo metalizado (puede ir feliz día).
1 jugo de melocotón en empaque de vidrio.
1 te frío.
1 snack salado.
1 fruta entera (manzana, pera o guineo).
2 sándwiches (1 jamón y queso y 1 de pavo).
1 salchicha enlatada.
1 mini chocolate.
1 tarjeta con mensaje personalizado.'
                ,
                'efective_date' => carbon::now(),
                'closing_date' => carbon::now()->addMonths(1),
                'status' => 1,
                'deal_id' => 3,
                'user_purchase_limit' => 5,
                'user_purchase_gift_limit' => 5,
                'courtesy' => 0,
                'purchase_activation' => 5
            ],
            [
                'original' => 55,
                'discount' => 50,
                'limit' => 5,
                'description' => 
                    'Paga $27 y no $55 por 10 clases de Ultimate Frisbee + matrícula.
                    ¡La mezcla de destrezas como la velocidad, la fuerza, el salto y explosividad, convierten este deporte en el favorito de muchos!'
                ,
                'efective_date' => carbon::now(),
                'closing_date' => carbon::now()->addMonths(1),
                'status' => 1,
                'deal_id' => 4,
                'user_purchase_limit' => 5,
                'user_purchase_gift_limit' => 5,
                'courtesy' => 0,
                'purchase_activation' => 5
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
            OptionPricing::create($data);
        }
    }
}
