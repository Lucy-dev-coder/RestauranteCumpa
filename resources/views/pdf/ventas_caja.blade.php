<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Ventas de Caja #{{ $caja->id }}</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            margin: 20px;
            background: #f5f7fa;
            color: #333;
        }

        h1,
        h2 {
            margin-bottom: 10px;
            font-weight: 700;
            color: #222;
        }

        table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 30px;
            background: #fff;
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 10px 12px;
            text-align: center;
            font-size: 0.95rem;
        }

        th {
            background-color: #4a90e2;
            color: #fff;
            text-transform: uppercase;
        }

        .resumen {
            margin-bottom: 30px;
            padding: 20px;
            border: 1px solid #bbb;
            border-radius: 8px;
            background: #fff;
            max-width: 420px;
            box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
        }

        .resumen h2 {
            margin-top: 0;
            color: #4a90e2;
        }

        .resumen-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-weight: 600;
            font-size: 1rem;
        }

        .resumen-item.total-general {
            font-size: 1.25rem;
            font-weight: 700;
            border-top: 2px solid #4a90e2;
            padding-top: 10px;
            margin-top: 15px;
            color: #222;
        }

        .ingresos-table th {
            background-color: #27ae60;
        }

        .ingresos-table td {
            color: #2ecc71;
            font-weight: 600;
        }

        .gastos-table th {
            background-color: #e74c3c;
        }

        .gastos-table td {
            color: #c0392b;
            font-weight: 600;
        }

        td.left {
            text-align: left;
        }
    </style>
</head>

<body>
    <h1>Ventas de Caja #{{ $caja->id }}</h1>
    <p><strong>Fecha apertura:</strong> {{ $caja->fecha_apertura }}</p>
    <p><strong>Fecha cierre:</strong> {{ $caja->fecha_cierre ?? 'Abierta' }}</p>
    <p><strong>Monto Apertura:</strong> {{ number_format($caja->monto_apertura, 2) }} Bs.</p>

    @if (!empty($caja->monto_cierre))
        <p><strong>Monto Cierre:</strong> {{ number_format($caja->monto_cierre, 2) }} Bs.</p>
    @endif


    @php
        $ventas_efectivo = $ventas->where('metodo_pago', 'efectivo')->sum('total');
        $ventas_qr = $ventas->where('metodo_pago', 'qr')->sum('total');
        $ingresos_manual = $movimientos->where('tipo', 'ingreso')->sum('monto');
        $gastos_manual = $movimientos->where('tipo', 'egreso')->sum('monto');
        $total_general = $ventas_efectivo + $ventas_qr + $ingresos_manual - $gastos_manual;
        $ingresos = $movimientos->where('tipo', 'ingreso');
        $gastos = $movimientos->where('tipo', 'egreso');
    @endphp

    @if ($ventas_efectivo || $ventas_qr || $ingresos_manual || $gastos_manual)
        <div class="resumen">
            <h2>Resumen General</h2>
            @if ($ventas_efectivo)
                <div class="resumen-item"><span>Ventas en efectivo:</span><span>{{ number_format($ventas_efectivo, 2) }}
                        Bs.</span></div>
            @endif
            @if ($ventas_qr)
                <div class="resumen-item"><span>Ventas en QR:</span><span>{{ number_format($ventas_qr, 2) }} Bs.</span>
                </div>
            @endif
            @if ($ingresos_manual)
                <div class="resumen-item" style="color: #27ae60;"><span>Ingresos
                        manuales:</span><span>{{ number_format($ingresos_manual, 2) }} Bs.</span></div>
            @endif
            @if ($gastos_manual)
                <div class="resumen-item" style="color: #e74c3c;"><span>Gastos
                        manuales:</span><span>-{{ number_format($gastos_manual, 2) }} Bs.</span></div>
            @endif
            <div class="resumen-item total-general"><span>Total
                    General:</span><span>{{ number_format($total_general, 2) }} Bs.</span></div>
        </div>
    @endif

    @if ($ingresos->count())
        <h2>Ingresos</h2>
        <table class="ingresos-table">
            <thead>
                <tr>
                    <th>Descripción</th>
                    <th>Monto (Bs.)</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($ingresos as $mov)
                    <tr>
                        <td class="left">{{ $mov->descripcion }}</td>
                        <td>{{ number_format($mov->monto, 2) }}</td>
                        <td>{{ $mov->created_at }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif

    @if ($gastos->count())
        <h2>Gastos</h2>
        <table class="gastos-table">
            <thead>
                <tr>
                    <th>Descripción</th>
                    <th>Monto (Bs.)</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($gastos as $mov)
                    <tr>
                        <td class="left">{{ $mov->descripcion }}</td>
                        <td>-{{ number_format($mov->monto, 2) }}</td>
                        <td>{{ $mov->created_at }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif

    <h2>Ventas</h2>
    <table>
        <thead>
            <tr>
                <th>ID Venta</th>
                <th>Mesa</th>
                <th>Total</th>
                <th>Método de Pago</th>
                <th>Fecha</th>
            </tr>
        </thead>
        <tbody>
            @forelse($ventas as $venta)
                <tr>
                    <td>{{ $venta->id }}</td>
                    <td>{{ $venta->mesa ?? '-' }}</td>
                    <td>{{ number_format($venta->total, 2) }} Bs.</td>
                    <td>{{ ucfirst($venta->metodo_pago) }}</td>
                    <td>{{ $venta->created_at }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" style="text-align:center;">No hay ventas para esta caja</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</body>

</html>
