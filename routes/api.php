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
use App\Http\Middleware\RoleMiddleware;


Route::post('/login', [AuthController::class, 'login']);

// Estas rutas requieren estar autenticado con Sanctum
Route::middleware('auth:sanctum')->group(function () {
  // Rutas solo para admin
  Route::middleware([RoleMiddleware::class . ':admin'])->group(function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('categorias', CategoriaController::class);
    Route::apiResource('bebidas', BebidaController::class);
    Route::apiResource('platos', PlatoController::class);
  });

  // Rutas para admin y cajero
  Route::middleware([RoleMiddleware::class . ':cajero'])->group(function () {
    Route::apiResource('cajas', CajaController::class);
    Route::apiResource('ventas', VentaController::class);
    Route::get('/cajas/abiertas', [CajaController::class, 'cajasAbiertas']);
    Route::get('categorias', [CategoriaController::class, 'index']);
    Route::get('bebidas', [BebidaController::class, 'index']);
    Route::get('platos', [PlatoController::class, 'index']);
    Route::apiResource('movimientos-caja', MovimientoCajaController::class);
    Route::patch('/bebidas/{bebida}/aumentar-stock', [BebidaController::class, 'aumentarStock']);

  });
  Route::post('/logout', [AuthController::class, 'logout']);
});
Route::get('cajas/{id}/pdf', [MovimientoCajaController::class, 'generarPdfVentas']);
