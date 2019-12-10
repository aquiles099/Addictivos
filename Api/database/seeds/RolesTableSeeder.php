<?php

use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesTableSeeder extends Seeder
{
    private function getData(){
        return $data = [
            [
                'name' => 'Root',
                'description' => 'Usuario con acceso a todos los modulos y funcionalidades'
            ],
            [
                'name' => 'Administrador',
                'description' => 'Usuario con acceso a todos los modulos y funcionalidades de ua compañia'
            ],
            [
                'name' => 'Comercio',
                'description' => 'Usuario que se encarga de administrar un comercio'
            ],
            [
                'name' => 'Empleado',
                'description' => 'Usuario encargado de canjear de un comercio'
            ],
            [
                'name' => 'Cliente',
                'description' => 'Usuario que con el que solo se puede comprar en la pagina'
            ],
            [
                'name' => 'Contable',
                'description' => 'Usuario encargado de la administracion'
            ],
            [
                'name' => 'Analista',
                'description' => 'análisis'
            ],
            [
                'name' => 'Vendedor',
                'description' => 'Usuario que busca los contratos con los comercios'
            ],
            [
                'name' => 'Marketing',
                'description' => 'Usuario relacionado a las redes sociales'
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
            Role::create($data);
        }
    }
}
