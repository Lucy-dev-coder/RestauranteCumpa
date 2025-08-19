<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    use HasFactory;

    protected $table = 'ventas';

    protected $fillable = [
        'caja_id',
        'usuario_id',
        'total',
        'mesa',
        'metodo_pago',
    ];

    // Relaciones

    public function caja()
    {
        return $this->belongsTo(Caja::class);
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }
    public function detalleVentas()
    {
        return $this->hasMany(DetalleVenta::class, 'venta_id');
    }

    // Relación con las bebidas
    public function detalleVentasBebida()
    {
        return $this->hasMany(DetalleVentasBebida::class, 'venta_id');
    }
}
