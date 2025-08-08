<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plato extends Model
{
    protected $table = 'platos';

    protected $fillable = [
        'nombre',
        'precio',
        'imagen',
        'estado',
        'categoria_id',
    ];

    // Relación con Categoria
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }
}
