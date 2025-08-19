<?php

namespace App\Http\Controllers;

use App\Models\Bebida;
use App\Models\MovimientoBebida;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BebidaController extends Controller
{
    public function index()
    {
        $bebidas = Bebida::all();
        return response()->json($bebidas);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre'  => 'required|string|max:30',
            'precio'  => 'required|numeric|min:0',
            'stock'   => 'nullable|integer|min:0',
            'estado'  => 'required|boolean',
            'imagen'  => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data = $request->only(['nombre', 'precio', 'stock', 'estado']);

        if ($request->hasFile('imagen')) {
            $data['imagen'] = $request->file('imagen')->store('bebidas', 'public');
        }

        $bebida = Bebida::create($data);

        return response()->json($bebida, 201);
    }

    public function show(Bebida $bebida)
    {
        return response()->json($bebida);
    }

    public function update(Request $request, Bebida $bebida)
    {
        $request->validate([
            'nombre'  => 'sometimes|required|string|max:30',
            'precio'  => 'sometimes|required|numeric|min:0',
            'stock'   => 'nullable|integer|min:0',
            'estado'  => 'boolean',
            'imagen'  => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data = $request->only(['nombre', 'precio', 'stock', 'estado']);

        if ($request->hasFile('imagen')) {
            if ($bebida->imagen && Storage::disk('public')->exists($bebida->imagen)) {
                Storage::disk('public')->delete($bebida->imagen);
            }
            $data['imagen'] = $request->file('imagen')->store('bebidas', 'public');
        }

        $bebida->update($data);

        return response()->json($bebida);
    }

    public function destroy(Bebida $bebida)
    {
        if ($bebida->imagen && Storage::disk('public')->exists($bebida->imagen)) {
            Storage::disk('public')->delete($bebida->imagen);
        }

        $bebida->delete();

        return response()->json(null, 204);
    }

    /**
     * Ajustar stock de una bebida.
     */
    public function ajustarStock(Request $request, Bebida $bebida)
    {
        $request->validate([
            'stock'  => 'required|integer', // puede ser positivo o negativo
            'motivo' => 'nullable|string|max:255',
        ]);

        $cantidad = $request->input('stock');
        $motivo = $request->input('motivo', null);

        $stockAnterior = $bebida->stock ?? 0;
        $stockNuevo = $stockAnterior + $cantidad;

        // Actualizar stock
        $bebida->update(['stock' => $stockNuevo]);

        // Registrar movimiento
        MovimientoBebida::create([
            'bebida_id'     => $bebida->id,
            'tipo'          => $cantidad > 0 ? 'entrada' : 'salida',
            'cantidad'      => abs($cantidad),
            'stock_anterior'=> $stockAnterior,
            'stock_nuevo'   => $stockNuevo,
            'motivo'        => $motivo,
        ]);

        return response()->json([
            'bebida' => $bebida,
            'mensaje' => 'Stock ajustado correctamente',
        ]);
    }
}
