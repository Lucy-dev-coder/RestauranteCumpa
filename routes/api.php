<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BebidaController;
use App\Http\Controllers\PlatoController;

Route::post('/login', [AuthController::class, 'login']);

// Estas rutas requieren estar autenticado con Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('users', UserController::class);
    Route::apiResource('categorias', CategoriaController::class);
    Route::apiResource('bebidas', BebidaController::class);
    Route::apiResource('platos', PlatoController::class);

});






//Route::get('/user', function (Request $request) {
  //  return $request->user();
//})->middleware('auth:sanctum');
