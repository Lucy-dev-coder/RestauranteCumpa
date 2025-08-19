<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function resumenPorFecha(Request $request)
    {
        $fecha = $request->input('fecha', date('Y-m-d'));

        $resultados = DB::select("
    SELECT 
        dv.plato AS producto,
        SUM(dv.cantidad) AS total_vendidos,
        SUM(dv.cantidad * dv.precio_unitario) AS total_precio,
        'plato' AS tipo
    FROM ventas v
    INNER JOIN detalle_ventas dv ON dv.venta_id = v.id
    WHERE DATE(v.created_at) = ?
    GROUP BY dv.plato

    UNION ALL

    SELECT 
        db.bebida AS producto,
        SUM(db.cantidad) AS total_vendidos,
        SUM(db.cantidad * db.precio_unitario) AS total_precio,
        'bebida' AS tipo
    FROM ventas v
    INNER JOIN detalle_ventas_bebidas db ON db.venta_id = v.id
    WHERE DATE(v.created_at) = ?
    GROUP BY db.bebida
", [$fecha, $fecha]);


        return response()->json([
            'fecha' => $fecha,
            'resumen' => $resultados,
        ]);
    }
}
