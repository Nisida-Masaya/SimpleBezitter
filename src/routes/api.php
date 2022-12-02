<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('login', 'App\Http\Controllers\LoginController@login')->name('login');
Route::post('logout', 'App\Http\Controllers\LoginController@logout')->name('logout');
Route::get('isAuth', 'App\Http\Controllers\LoginController@isAuth')->name('isAuth');


Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('articles', 'App\Http\Controllers\ArticlesController');
});

