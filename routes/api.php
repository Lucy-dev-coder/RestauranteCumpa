<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BebidaController;
use App\Http\Controllers\PlatoController;
use App\Http\Controllers\CajaController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\MovimientoCajaController;

Route::post('/login', [AuthController::class, 'login']);

// Estas rutas requieren estar autenticado con Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('users', UserController::class);
    Route::apiResource('categorias', CategoriaController::class);
    Route::apiResource('bebidas', BebidaController::class);
    Route::apiResource('platos', PlatoController::class);
    Route::apiResource('cajas', CajaController::class);
    Route::apiResource('ventas', VentaController::class);
    Route::get('/cajas/abiertas', [CajaController::class, 'cajasAbiertas']);
});
Route::get('cajas/{id}/pdf', [MovimientoCajaController::class, 'generarPdfVentas']);





//Route::get('/user', function (Request $request) {
  //  return $request->user();
//})->middleware('auth:sanctum');
