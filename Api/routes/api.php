<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


/******************************************************************************
DEALS
*******************************************************************************/

Route::group([

    // 'middleware' => 'api',
    'prefix' => 'deal'

], function ($router) {
 
Route::get('deals', 'DealController@index');
Route::get('deals_cliente', 'DealController@dealsCliente');
Route::get('types', 'DealController@types');
Route::post('create', 'DealController@prepareCreateOrUpdateData');
Route::post('{id}', 'DealController@prepareCreateOrUpdateData');
Route::get('{id}', 'DealController@get');
Route::delete('{id}', 'DealController@delete');

/******************************************************************************
OPTION PRICES
*******************************************************************************/
    Route::group([

        // 'middleware' => 'api',
        'prefix' => '{deal_id}/optionprice'

    ], function ($router) {
        
        Route::get('optionprices', 'OptionPricingController@index');
        Route::post('create', 'OptionPricingController@prepareCreateOrUpdateData');
        Route::patch('{id}', 'OptionPricingController@prepareCreateOrUpdateData');
        Route::get('{id}', 'OptionPricingController@get');
        Route::delete('{id}', 'OptionPricingController@delete');
        
    });
});
Route::get('optionprice/alloptionprices', 'OptionPricingController@getAllOptionPrices');
/******************************************************************************
USER
*******************************************************************************/
Route::group([
    // 'middleware' => 'api',
    'prefix' => 'user'

], function ($router) {
 
    Route::get('users', 'UserController@index');
    Route::get('purchases/{id}', 'UserController@purchases');
    Route::get('purchases/{id}/approved/', 'UserController@purchasesApproved');
    Route::post('create', 'UserController@prepareCreateOrUpdateData');
    Route::patch('{id}', 'UserController@prepareCreateOrUpdateData');
    Route::get('{id}', 'UserController@get');
    Route::delete('{id}', 'UserController@delete');
    Route::get('/user_by_role/{id}', 'UserController@getUserByRole');

    Route::group([
        // 'middleware' => 'api',
        'prefix' => '{user_id}/card'
    
    ], function ($router) {
     
        Route::get('/cards', 'UserCardController@index');
        Route::post('create', 'UserCardController@prepareCreateOrUpdateData');
        Route::patch('{id}', 'UserCardController@prepareCreateOrUpdateData');
        Route::get('{id}', 'UserCardController@get');
        Route::delete('{id}', 'UserCardController@delete');
    });
});

/******************************************************************************
PAYMENT PLATFORM
*******************************************************************************/
Route::group([
    // 'middleware' => 'api',
    'prefix' => 'paymentplatform'

], function ($router) {
 
    Route::get('paymentplatforms', 'PaymentPlatformController@index');
    Route::post('create', 'PaymentPlatformController@prepareCreateOrUpdateData');
    Route::patch('{id}', 'PaymentPlatformController@prepareCreateOrUpdateData');
    Route::get('{id}', 'PaymentPlatformController@get');
    Route::delete('{id}', 'PaymentPlatformController@delete');
});

/******************************************************************************
COMPANY
*******************************************************************************/
Route::group([
    // 'middleware' => 'api',
    'prefix' => 'company'

], function ($router) {
Route::get('companies', 'CompanyController@index');
Route::get('{company}', 'CompanyController@show');
Route::post('create','CompanyController@store');
Route::put('{company}', "CompanyController@update");
Route::delete('{company}', "CompanyController@destroy");
});

/******************************************************************************
COMMERCE
*******************************************************************************/
Route::group([
    // 'middleware' => 'api',
    'prefix' => 'commerce'

], function ($router) {
Route::get('commerces', 'CommerceController@index');
Route::get('{commerce}', 'CommerceController@show');
Route::post('create','CommerceController@store');
Route::put('{commerce}', "CommerceController@update");
Route::delete('{commerce}', "CommerceController@destroy");
});

/******************************************************************************
BRANCH
*******************************************************************************/
Route::group([
    // 'middleware' => 'api',
    'prefix' => 'branch'
], function ($router) {
Route::get('/branches', 'BranchController@index');
Route::get('{branch}', 'BranchController@show');
Route::post('create','BranchController@store');
Route::put('{branch}', "BranchController@update");
Route::delete('{branch}', "BranchController@destroy");
});

/******************************************************************************
CATEGORY
*******************************************************************************/
Route::group([
    // 'middleware' => 'api',
    'prefix' => 'category'

], function ($router) {
    Route::get('/categories', 'CategoryController@index');
    Route::post('create','CategoryController@prepareCreateOrUpdateData');
    Route::patch('/{id}', "CategoryController@prepareCreateOrUpdateData");
    Route::get('/{id}', 'CategoryController@get');
    Route::delete('/{id}', "CategoryController@delete");
});

/******************************************************************************
PURCHASE
*******************************************************************************/
Route::group([
    // 'middleware' => 'api',
    'prefix' => 'purchase'

], function ($router) {
    Route::get('/purchases', 'PurchaseController@index');
    Route::post('create','PurchaseController@prepareCreateOrUpdateData');
    Route::patch('/{id}', "PurchaseController@prepareCreateOrUpdateData");
    Route::get('/{id}', 'PurchaseController@get');
    Route::post('change-status', 'PurchaseController@changeStatus');
    // Route::delete('/{id}', "PurchaseController@delete");
});


Route::group([

    // 'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login')->name('login');
    Route::post('register', 'UserController@prepareCreateOrUpdateData');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});

