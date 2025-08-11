<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleVentasBebida extends Model
{
    use HasFactory;

    protected $table = 'detalle_ventas_bebidas';

    protected $fillable = [
        'venta_id',
        'bebida',
        'bebida_id',
        'cantidad',
        'precio_unitario',
    ];

    // Relación con Venta
    public function venta()
    {
        return $this->belongsTo(Venta::class, 'venta_id');
    }

    // Relación con Bebida
    public function bebidaRelacion()
    {
        return $this->belongsTo(Bebida::class, 'bebida_id');
    }
}
