<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Venta;
use App\Models\DetalleVenta;
use App\Models\DetalleVentasBebida;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Caja;

class VentaController extends Controller
{
    // Listar todas las ventas
    public function index()
    {
        $ventas = Venta::with(['caja', 'usuario'])->get();
        return response()->json($ventas);
    }

    // Crear una nueva venta
    public function store(Request $request)
    {
        $validated = $request->validate([
            'caja_id' => 'required|exists:caja,id',
            'total' => 'required|numeric|min:0',
            'mesa' => 'nullable|string|max:10',
            'metodo_pago' => 'required|in:efectivo,qr',
            'items' => 'required|array|min:1',
            'items.*.tipo' => 'required|in:plato,bebida',
            'items.*.id' => 'nullable|integer',
            'items.*.nombre' => 'required|string|max:100',
            'items.*.cantidad' => 'required|integer|min:1',
            'items.*.precio' => 'required|numeric|min:0',
            'items.*.observacion' => 'nullable|string|max:255',
        ]);

        $usuarioId = $request->user()->id;

        // Verificar que la caja_id enviada pertenece al usuario y está abierta
        $cajaValida = \App\Models\Caja::where('id', $validated['caja_id'])
            ->where('usuario_id', $usuarioId)
            ->where('estado', 'abierta')
            ->exists();

        if (!$cajaValida) {
            return response()->json([
                'error' => 'Caja inválida o no abierta para este usuario'
            ], 403);
        }

        DB::beginTransaction();
        try {
            // Crear la venta
            $venta = Venta::create([
                'caja_id' => $validated['caja_id'],
                'usuario_id' => $usuarioId,
                'total' => $validated['total'],
                'mesa' => $validated['mesa'] ?? null,
                'metodo_pago' => $validated['metodo_pago'],
            ]);

            // Guardar detalles y actualizar stock de bebidas
            foreach ($validated['items'] as $item) {
                if ($item['tipo'] === 'plato') {
                    DetalleVenta::create([
                        'venta_id' => $venta->id,
                        'plato' => $item['nombre'],
                        'cantidad' => $item['cantidad'],
                        'precio_unitario' => $item['precio'],
                    ]);
                } elseif ($item['tipo'] === 'bebida') {
                    DetalleVentasBebida::create([
                        'venta_id' => $venta->id,
                        'bebida' => $item['nombre'],
                        'bebida_id' => $item['id'] ?? null,
                        'cantidad' => $item['cantidad'],
                        'precio_unitario' => $item['precio'],
                    ]);

                    // Reducir stock de la bebida
                    if (!empty($item['id'])) {
                        \App\Models\Bebida::where('id', $item['id'])->decrement('stock', $item['cantidad']);
                    }
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Venta registrada con éxito',
                'venta' => $venta
            ], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'error' => 'No se pudo registrar la venta',
                'detalle' => $th->getMessage()
            ], 500);
        }
    }


    // Mostrar venta específica
    public function show(Venta $venta)
    {
        $venta->load(['caja', 'usuario']);
        return response()->json($venta);
    }

    // Actualizar venta
    public function update(Request $request, Venta $venta)
    {
        $validated = $request->validate([
            'caja_id' => 'required|exists:caja,id',
            'usuario_id' => 'nullable|exists:users,id',
            'total' => 'required|numeric|min:0',
            'mesa' => 'nullable|string|max:10',
            'metodo_pago' => 'required|in:efectivo,qr',
        ]);

        $venta->update($validated);

        return response()->json($venta);
    }

    // Eliminar venta
    public function destroy(Venta $venta)
    {
        $venta->delete();
        return response()->json(null, 204);
    }
}
