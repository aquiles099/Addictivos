<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(RolesTableSeeder::class);
        $this->call(RolesUsersTableSeeder::class);
        $this->call(CompaniesTableSeeder::class);
        $this->call(CommercesTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(DealTypesTableSeeder::class);
        $this->call(DealsTableSeeder::class);
        $this->call(OptionPricingsTableSeeder::class);
        $this->call(ImagesDealsTableSeeder::class);
        $this->call(UserCompaniesTableSeeder::class);
    }
}
