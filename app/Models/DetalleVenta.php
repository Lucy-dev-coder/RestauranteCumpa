<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleVenta extends Model
{
    use HasFactory;

    protected $table = 'detalle_ventas';

    protected $fillable = [
        'venta_id',
        'plato',
        'cantidad',
        'precio_unitario',
        'obs',
    ];

    // Relación con Venta
    public function venta()
    {
        return $this->belongsTo(Venta::class, 'venta_id');
    }
}
