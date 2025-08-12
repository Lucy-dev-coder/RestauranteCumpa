<?php

namespace App\Http\Controllers;

use App\Models\Caja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CajaController extends Controller
{
    // Listar todas las cajas
    public function index()
    {
        $user = Auth::user();
        if ($user->rol === 'admin') {
            // Admin ve todas las cajas
            $cajas = Caja::with('usuario')->orderBy('id', 'desc')->get();
        } elseif ($user->rol === 'cajero') {
            // Cajero ve solo sus cajas
            $cajas = Caja::with('usuario')
                ->where('usuario_id', $user->id)  // ajusta el campo si es otro nombre
                ->orderBy('id', 'desc')
                ->get();
        } else {
            // Opcional: si otro rol no tiene acceso, retorna 403 o vacío
            return response()->json([], 403);
        }

        return response()->json($cajas);
    }



    // Crear una nueva caja
    public function store(Request $request)
    {
        $validated = $request->validate([
            'monto_apertura' => 'required|numeric|min:0',
            'observaciones' => 'nullable|string',
        ]);

        $usuarioId = Auth::id();

        // Validar que no tenga otra caja abierta
        $cajaAbierta = Caja::where('usuario_id', $usuarioId)
            ->where('estado', 'abierta')
            ->first();

        if ($cajaAbierta) {
            return response()->json([
                'message' => 'Este usuario ya tiene una caja abierta.'
            ], 422);
        }

        // Crear la caja con valores automáticos
        $caja = Caja::create([
            'fecha_apertura' => now(),
            'monto_apertura' => $validated['monto_apertura'],
            'estado' => 'abierta',
            'observaciones' => $validated['observaciones'] ?? null,
            'usuario_id' => $usuarioId,
        ]);

        return response()->json($caja, 201);
    }


    // Mostrar una caja específica
    public function show($id)
    {
        $caja = Caja::with('usuario')->findOrFail($id);
        return response()->json($caja);
    }

    // Actualizar datos de una caja
    public function update(Request $request, $id)
    {
        $caja = Caja::findOrFail($id);

        $validated = $request->validate([
            'monto_cierre' => 'nullable|numeric|min:0',
            'observaciones' => 'nullable|string',
        ]);

        $ventasIds = DB::table('ventas')->where('caja_id', $id)->pluck('id');

        $totalPlatos = DB::table('detalle_ventas')
            ->whereIn('venta_id', $ventasIds)
            ->selectRaw('SUM(cantidad * precio_unitario) as total')
            ->value('total') ?? 0;

        $totalBebidas = DB::table('detalle_ventas_bebidas')
            ->whereIn('venta_id', $ventasIds)
            ->selectRaw('SUM(cantidad * precio_unitario) as total')
            ->value('total') ?? 0;

        $movimientosIngresos = DB::table('movimientos_caja')
            ->where('caja_id', $id)
            ->where('tipo', 'ingreso')
            ->sum('monto');

        $movimientosEgresos = DB::table('movimientos_caja')
            ->where('caja_id', $id)
            ->where('tipo', 'egreso')
            ->sum('monto');

        $totalMovimientos = $movimientosIngresos - $movimientosEgresos;

        // Monto esperado suma monto_apertura + ventas + movimientos netos
        $monto_esperado = ($caja->monto_apertura ?? 0) + $totalPlatos + $totalBebidas + $totalMovimientos;

        $validated['fecha_cierre'] = now();
        $validated['estado'] = 'cerrada';
        $validated['monto_esperado'] = $monto_esperado;

        $caja->update($validated);

        return response()->json($caja);
    }



    // Eliminar caja
    public function destroy($id)
    {
        $caja = Caja::findOrFail($id);
        $caja->delete();

        return response()->json(['message' => 'Caja eliminada correctamente']);
    }

    public function cajasAbiertas(Request $request)
    {
        $userId = $request->user()->id;

        $cajasAbiertas = Caja::where('usuario_id', $userId)
            ->where('estado', 'abierta')
            ->get();

        return response()->json($cajasAbiertas);
    }
}
