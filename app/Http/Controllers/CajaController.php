<?php

namespace App\Http\Controllers;

use App\Models\Caja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CajaController extends Controller
{
    // Listar todas las cajas
    public function index()
    {
        $cajas = Caja::with('usuario')->orderBy('id', 'desc')->get();
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

        // Sobrescribes o añades los valores que quieres fijar:
        $validated['fecha_cierre'] = now();
        $validated['estado'] = 'cerrada';

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
}
