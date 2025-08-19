<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bebida extends Model
{
    // Nombre de la tabla (opcional, Laravel lo infiere como 'bebidas')
    protected $table = 'bebidas';

    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'nombre',
        'precio',
        'stock',
        'imagen',
        'estado',
    ];
    public function movimientos()
    {
        return $this->hasMany(MovimientoBebida::class);
    }
}
