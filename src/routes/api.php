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
Route::post('signup', 'App\Http\Controllers\SignupController@store')->name('signup');
Route::post('update', 'App\Http\Controllers\LoginController@update')->name('update');
Route::get('isAuth', 'App\Http\Controllers\LoginController@isAuth')->name('isAuth');
Route::get('getLoginUser', 'App\Http\Controllers\LoginController@getLoginUser')->name('getLoginUser');
Route::post('userImageUpdate', 'App\Http\Controllers\LoginController@userImageUpdate')->name('userImageUpdate');
Route::post('updatePassword', 'App\Http\Controllers\LoginController@updatePassword')->name('updatePassword');
Route::get('loginUser', 'App\Http\Controllers\LoginController@loginUser')->name('loginUser');



Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('getLoginUser', 'App\Http\Controllers\LoginController@getLoginUser')->name('getLoginUser');
    Route::get('user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('articles', 'App\Http\Controllers\ArticlesController');
    Route::post('like/{articleId}', 'App\Http\Controllers\LikeController@store');
    Route::post('unlike/{articleId}', 'App\Http\Controllers\LikeController@destroy');
});
