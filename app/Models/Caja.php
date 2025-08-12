<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Caja extends Model
{
    use HasFactory;

    protected $table = 'caja'; // Nombre de la tabla

    protected $fillable = [
        'fecha_apertura',
        'fecha_cierre',
        'monto_apertura',
        'monto_cierre',
        'monto_esperado',
        'estado',
        'observaciones',
        'usuario_id',
    ];

    // Relación: una caja pertenece a un usuario
    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }
    public function ventas()
    {
        return $this->hasMany(Venta::class); // Relación 1:N con ventas
    }
    public function movimientosCaja()
    {
        return $this->hasMany(MovimientoCaja::class); // Relación 1:N con movimientos de caja
    }
}
