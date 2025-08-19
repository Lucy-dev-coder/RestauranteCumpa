<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovimientoBebida extends Model
{
    use HasFactory;

    protected $table = 'movimientos_bebidas';

    protected $fillable = [
        'bebida_id',
        'tipo',
        'cantidad',
        'stock_anterior',
        'stock_nuevo',
        'motivo',
    ];

    /**
     * Relación con la bebida
     */
    public function bebida()
    {
        return $this->belongsTo(Bebida::class);
    }
}
