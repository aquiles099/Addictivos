<?php

use Illuminate\Database\Seeder;
use App\Models\Deal;
use Carbon\Carbon;

class DealsTableSeeder extends Seeder
{
    private function getData(){
        return [
            [
                'short_title' => '50% OFF: PAGA DESDE $55 POR CURSO TEÓRICO + EVALUACIÓN PRÁCTICA PARA PERSONAS QUE SABEN MANEJAR.',
                'long_title' => '50% OFF: Paga desde $55 por un curso de manejo teórico + evaluación práctica para personas que saben manejar. ¡Haz clic en “comprar” para ver las opciones disponibles!',
                'images_deals_id' => null,
                'effective_date' => carbon::now(),
                'deal_total_limit' => 5,
                'user_purchase_limit' => 5,
                'short_description' => 'Tarjeta de Oferta trae para ti esta grandiosa promoción… ¡Ahorra un 50%, obtén tus licencias y recibe tu certificado válido por la ATTT solo con “Auto Escuela de Manejo”!',
                'long_description' => 
                    '¿Sabes qué debes hacer para recibir tu licencia de conducir y tu certificado válido por la ATTT?

                    ¡Nosotros sí!
                    
                    “Auto Escuela de Manejo” es un centro que se especializa en formar conductores responsables y respetuosos de las leyes. Además, cuenta con profesionales altamente capacitados que te orientarán y guiarán en todo el proceso.
                    
                    ¡Obtén tu licencia con los mejores!
                    
                    ¡Aprovecha esta súper promoción!, elige la opción que más se adapte a tus necesidades:
                    
                    Opción 1: ($55)
                    
                    Curso de manejo teórico.
                    Prueba práctica para obtener licencia de vehículo (Tipo A-C).
                    Certificado válido por la ATTT para personas que saben conducir.
                    Opción 2: ($45)
                    
                    Curso de manejo teórico.
                    Prueba práctica para obtener licencia de moto (Tipo A-B).
                    Certificado válido por la ATTT para personas que saben conducir.
                    Opción 3: ($67)
                    
                    Curso de manejo teórico.
                    Prueba práctica para obtener licencia comercial (Tipo A-C-D).
                    Certificado válido por la ATTT para personas que saben conducir.
                    Opción 4: ($45)
                    
                    Curso de manejo teórico.
                    Prueba práctica para obtener ampliación de licencia (Tipo B, C o D).
                    Certificado válido por la ATTT para personas que ya tienen su licencia de conducir y que necesiten ampliar a otro tipo de licencia.
                    Opción 5: ($67.50)
                    
                    Curso de manejo teórico.
                    Prueba práctica para obtener licencia (Tipo B y D).
                    Certificado válido por la ATTT para personas que necesitan obtener los 2 tipos de licencia de conducir.
                    ¡No dejes pasar esta grandiosa oportunidad que solo Tarjeta de Oferta tiene para ti!... ¡Los vouchers son limitados! ¡Apúrate!'
                ,
                'restrictions' => 
                    'No válido para otras ofertas y promociones.
                    No incluye el costo de la licencia.
                    No incluye el examen de tipaje de sangre.'
                ,
                'commerce_id' => 1,
                'category_id' => 3,
                'slug' => 'primera-oferta',
                'closing_date' => carbon::now()->addMonths(1),
                'is_public' => true,
                'available_until' =>  carbon::now()->addMonths(3),
                'gift_title' => 'Regalo',
                'user_gift_limit' => 5,
                'discount' => 50,
                'images_deal' => false,
                'payment_type' => '',
                'deal_type_id' => 1,
                'commission' => 20,
                'seller_id' => null,
                'company_id' => 1 
            ],
            [
                'short_title' => '56% OFF: PAGA DESDE $78 POR UNA NOCHE EN UNA HABITACIÓN DOBLE PARA 2 PERSONAS. ',
                'long_title' => '56% OFF: Paga $78 por una noche en una habitación Doble para 2 personas + desayuno estilo americano + cóctel de bienvenida + 1 hora de cancha de tenis. ¡Haz clic en “comprar” para ver más opciones disponibles!',
                'images_deals_id' => null,
                'effective_date' => carbon::now(),
                'deal_total_limit' => 5,
                'user_purchase_limit' => 5,
                'short_description' => '¡Escápate por una noche y vive una gratificante experiencia en el Hotel Faranda Guayacanes!... ¡Aprovecha esta súper oferta que Tarjeta de Oferta tiene para ti y disfruta los mejores precios del mercado!',
                'long_description' => 
                    '¡Llena de paz tus vacaciones y renueva tus energías!

                    El Hotel Faranda Guayacanes Chitré es un oasis de tranquilidad ideado para ofrecerles a sus huéspedes una estadía aislada del bullicio de la ciudad.
                    
                    El entorno natural en el que se ubica este grandioso hotel, te invitará a relajarte y desconectarte por completo. Un bello paisaje con jardines tropicales, lago, piscina, restaurante, pistas de tenis, habitaciones cómodas y salones para eventos, son algunos de los elementos que te cautivarán por completo.
                    
                    ¡Disfruta de hasta un 56% OFF en “Hotel Faranda Guayacanes”!... ¡Adquiere tu voucher al mejor precio!
                    
                    Opción 1: Paga $78 y no $180 por una noche en una habitación Doble para 2 personas + desayuno estilo americano + cóctel de bienvenida + 1 hora de cancha de tenis.
                    Las habitaciones dobles del Hotel Faranda Guayacanes Chitré son una elección muy recomendable para parejas que quieren descansar cerca del centro de la ciudad. Están equipadas con dos camas, teléfono, cajilla de seguridad, televisión, wifi sin costo adicional y cuarto de baño privado con artículos de aseo.
                    
                    Opción 2: Paga $93 y no $207 por una noche en una habitación Jr. Suite para 2 personas + desayuno estilo americano + cóctel de bienvenida + 1 hora de cancha de tenis.
                    Las elegantes junior suite del Hotel Faranda Guayacanes Chitré le otorgan un toque muy especial a tus vacaciones románticas. Estas exclusivas junior suite le sorprenderán por sus completos servicios 4 estrellas, su alegre decoración y esos pequeños detalles que saben marcar la diferencia.
                    
                    Se equipan con una cama King, un sofá cama, nevera, teléfono, cajilla de seguridad, televisión, wifi sin costo adicional y cuarto de baño privado con artículos de aseo.
                    
                    Opción 3: Paga $107 y no $234 por una noche en una Master Suite para 2 personas + desayuno estilo americano + cóctel de bienvenida + 1 hora de cancha de tenis.
                    Las habitaciones Master Suite amplias cuentan con una cama King y 1 cama doble con cuartos separados y 2 baños, aire acondicionado, secador, armarios, mesa de trabajo, TV por cable. Destacan por ser estancias modernas, confortables y muy funcionales en una de las mejores zonas de Chitré.
                    
                    ¡Reserva con los mejores!... ¡No dejes que te lo cuenten!
                    
                    Para disfrutar de esta oferta debes saber:
                    
                    Vouchers ilimitados pueden ser comprados y usados por persona.
                    Vouchers ilimitados pueden ser comprados para regalar.
                    La oferta tendrá una duración de 3 meses.
                    Realizar reservas por correo electrónico.
                    Check In: 2:00 p.m. / Check Out: 12:00 p.m.
                    Late Check Out 3:00 p.m. GRATIS, sujetos a disponibilidad
                    Para efectos de depósito.
                    El máximo de personas por habitación es de 2 adultos y 2 niños, o 3 adultos.
                    Niños de 0-5 años no tienen costo alguno; niños de 6 a 11 años pagan $10 + itbms por noche e incluye desayuno.
                    Niños a partir de los 12 años cuentan como adultos.
                    La persona adicional paga $22 por noche.
                    Se requiere previa reservación con al menos 48 horas de anticipación (sujeto a disponibilidad).
                    En caso de cancelaciones, las mismas se deben hacer con 24 horas de antelación o puede conllevar a la pérdida del voucher.
                    ITBMS incluido.
                    Impuesto hotelero incluido.
                    Propinas no incluidas.
                    El hotel mantendrá espacios limitados designados diariamente para el uso de cupones.'                
                ,
                'restrictions' => 
                    'No válido para otras ofertas y promociones.'
                ,
                'commerce_id' => 1,
                'category_id' => 3,
                'slug' => 'segunda-oferta',
                'closing_date' => carbon::now()->addMonths(1),
                'is_public' => true,
                'available_until' =>  carbon::now()->addMonths(3),
                'gift_title' => 'Regalo',
                'user_gift_limit' => 5,
                'discount' => 56,
                'images_deal' => false,
                'payment_type' => '',
                'deal_type_id' => 1,
                'commission' => 20,
                'seller_id' => null,
                'company_id' => 1 
            ],
            [
                'short_title' => '50% OFF: ¡SORPRENDE A PAPÁ! PAGA $30 POR UN DESAYUNO SORPRESA + DECORACIÓN + TARJETA Y GLOBO.',
                'long_title' => '50% OFF: ¡Sorprende a papá en su día! Paga $30 por un desayuno sorpresa + decoración + tarjeta y globo personalizado en Sweet Princess. ¡Haz clic en “comprar” para ver opción de arreglo sorpresa disponible!',
                'images_deals_id' => null,
                'effective_date' => carbon::now(),
                'deal_total_limit' => 5,
                'user_purchase_limit' => 5,
                'short_description' => '¡Consiente a papá en su día! Tarjeta de Oferta se alía con “Sweet Princess” para ofrecerte una variedad de opciones para que digas te amo o te quiero a esa persona especial.',
                'long_description' => 
                    '¡Sorprende a papá en su día!

                    “Sweet Princess” sabe que papá se lo merece y, ¿qué mejor detalle que un delicioso desayuno sorpresa para empezar el día?
                    
                    ¡El desayuno es la comida más importante del día y, en esta ocasión, se lo puedes llevar a papá a la cama!
                    
                    ¡Sorpréndelo con un súper desayuno cargado de energía! O ¡Elige también entre un maravilloso arreglo y hazle llegar tu amor donde quiera que esté!
                    
                    Regala un detalle único, maravilloso y personalizado, tienes dos opciones diferentes para que escojas la que más te gusta y desearle FELIZ DÍA:
                    
                    Opción 1: Paga $30 y no $60 por un desayuno sorpresa que incluye:
                    
                    Canasta.
                    Globo metalizado (puede ir feliz día).
                    1 jugo de melocotón en empaque de vidrio.
                    1 te frío.
                    1 snack salado.
                    1 fruta entera (manzana, pera o guineo).
                    2 sándwiches (1 jamón y queso y 1 de pavo).
                    1 salchicha enlatada.
                    1 mini chocolate.
                    1 tarjeta con mensaje personalizado.
                    Opción 2: Paga $25 y no $50 por arreglo sorpresa que incluye:
                    
                    1 cerveza alemana.
                    2 snack salados.
                    1 barra de chocolate.
                    1 pringles.
                    1 paquete de maní.
                    Globo metalizado.
                    Tarjeta según motivo.
                    Canasta.
                    ¡No necesitas una fecha para enviar un obsequio lleno de amor!
                    
                    “Sweet Princess” te ofrece una variedad de presentes para tus momentos especiales, desde regalos personalizados, fiestas, aniversarios, eventos empresariales y más. ¡Deja que te acompañe en este momento tan único!'                
                ,
                'restrictions' => 
                    'No válido para otras ofertas y promociones.'
                ,
                'commerce_id' => 1,
                'category_id' => 3,
                'slug' => 'tercera-oferta',
                'closing_date' => carbon::now()->addMonths(1),
                'is_public' => true,
                'available_until' =>  carbon::now()->addMonths(3),
                'gift_title' => 'Regalo',
                'user_gift_limit' => 5,
                'discount' => 50,
                'images_deal' => false,
                'payment_type' => '',
                'deal_type_id' => 1,
                'commission' => 20,
                'seller_id' => null,
                'company_id' => 1 
            ],
            [
                'short_title' => '50% OFF: Paga $27 por 10 clases de Ultimate Frisbee + matrícula en "Top Ultimate".',
                'long_title' => '50% OFF: ¡Diviértete mientras ejercitas tu cuerpo! Paga $27 por 10 clases de Ultimate Frisbee + matrícula en Top Ultimate.',
                'images_deals_id' => null,
                'effective_date' => carbon::now(),
                'deal_total_limit' => 5,
                'user_purchase_limit' => 5,
                'short_description' => '¿Quieres jugar un deporte que mezcle diversión con competitividad de forma sana y segura? ¡Tarjeta de Oferta lo tiene y te trae una súper promoción donde encontrarás eso y más con Top Ultimate!',
                'long_description' => 
                    '¡Diviértete aprendiendo a jugar de una manera segura, dinámica y altamente competitiva!

                    El Ultimate Frisbee, es un deporte de equipo que combina habilidades y reglas de otras disciplinas como las del fútbol, baloncesto y rugby, sustituyendo el balón por un disco volador. Una de sus características más llamativas es la ausencia de un árbitro, el deporte se regula por el espíritu deportivo (o principio del juego justo) de cada jugador.
                    
                    ¿De qué se trata este juego?
                    
                    El objetivo es obtener puntos recibiendo o realizando pases a los compañeros de equipo hasta llegar a la zona de anotación del oponente, de modo similar al fútbol americano. Gana el que anote una mayor cantidad de puntos en un tiempo determinado o el que anote cierto número de goles más rápido.
                    
                    Se juega entre dos equipos de aproximadamente 5 o 7 jugadores en un campo de césped o en la playa.
                    
                    ¡Aprende las 10 sencillas reglas de este fabuloso juego!
                    
                    (50% OFF) OFERTA: Paga $27 y no $55 por 10 clases de Ultimate Frisbee + matrícula.
                    ¡La mezcla de destrezas como la velocidad, la fuerza, el salto y explosividad, convierten este deporte en el favorito de muchos!
                    
                    Además, el Ultimate al poner énfasis en la deportividad y al juego limpio, promueve el respeto con el contrincante y al diálogo con él, por lo que no tiene distinción para la elección de categorías, tanto hombres como mujeres pueden jugar en el mismo equipo y participar en torneos y competencias oficiales.
                    
                    ¿Estás listo para intentarlo?
                    
                    ¡Ponte a prueba e invita a todos tus amigos!... ¡Desafíalos y que empiece la diversión!'                
                ,
                'restrictions' => 
                    'No válido para otras ofertas y promociones.'
                ,
                'commerce_id' => 1,
                'category_id' => 3,
                'slug' => 'tercera-oferta',
                'closing_date' => carbon::now()->addMonths(1),
                'is_public' => true,
                'available_until' =>  carbon::now()->addMonths(3),
                'gift_title' => 'Regalo',
                'user_gift_limit' => 5,
                'discount' => 50,
                'images_deal' => false,
                'payment_type' => '',
                'deal_type_id' => 1,
                'commission' => 20,
                'seller_id' => null,
                'company_id' => 1 
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
            Deal::create($data);
        }
    }
}
