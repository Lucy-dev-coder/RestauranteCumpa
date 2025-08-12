<?php

namespace App\Http\Controllers;

use App\Models\MovimientoCaja;
use Illuminate\Http\Request;
use App\Models\Caja;  // no olvides importar el modelo Caja
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;  // Asegúrate de usar este o alias correcto


class MovimientoCajaController extends Controller
{
    // Listar todos los movimientos
    public function index()
    {
        $movimientos = MovimientoCaja::with('caja')->get();
        return response()->json($movimientos);
    }

    // Guardar nuevo movimiento

    public function store(Request $request)
    {
        $validated = $request->validate([
            'caja_id' => 'required|exists:caja,id',
            'tipo' => 'required|in:ingreso,egreso',
            'descripcion' => 'required|string',
            'monto' => 'required|numeric|min:0',
        ]);

        $user = Auth::user();

        $caja = Caja::where('id', $validated['caja_id'])
            ->where('estado', 'abierta')
            ->where('usuario_id', $user->id)
            ->first();

        if (!$caja) {
            return response()->json([
                'message' => 'No puedes agregar movimientos a cajas que no están abiertas o que no te pertenecen.'
            ], 422);
        }

        $movimiento = MovimientoCaja::create($validated);

        return response()->json($movimiento, 201);
    }

    // Mostrar un movimiento
    public function show($id)
    {
        $movimiento = MovimientoCaja::with('caja')->findOrFail($id);
        return response()->json($movimiento);
    }

    // Actualizar movimiento
    public function update(Request $request, $id)
    {
        $movimiento = MovimientoCaja::findOrFail($id);

        $validated = $request->validate([
            'caja_id' => 'sometimes|exists:caja,id',
            'tipo' => 'sometimes|in:ingreso,egreso',
            'descripcion' => 'sometimes|string',
            'monto' => 'sometimes|numeric|min:0',
        ]);

        $movimiento->update($validated);

        return response()->json($movimiento);
    }

    // Eliminar movimiento
    public function destroy($id)
    {
        $movimiento = MovimientoCaja::findOrFail($id);
        $movimiento->delete();

        return response()->json(null, 204);
    }

    public function generarPdfVentas($idCaja)
    {
        $caja = Caja::with(['ventas', 'movimientosCaja'])->findOrFail($idCaja);
        $ventas = $caja->ventas;
        $movimientos = $caja->movimientosCaja;

        $pdf = PDF::loadView('pdf.ventas_caja', compact('caja', 'ventas', 'movimientos'));

        return $pdf->stream("ventas_caja_{$caja->id}.pdf");
    }
    
}
