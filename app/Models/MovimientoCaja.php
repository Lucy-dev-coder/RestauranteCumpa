<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovimientoCaja extends Model
{
    use HasFactory;

    protected $table = 'movimientos_caja';

    protected $fillable = [
        'caja_id',
        'tipo',
        'descripcion',
        'monto',
    ];

    // Relación con caja
    public function caja()
    {
        return $this->belongsTo(Caja::class);
    }
}
