<?php

namespace App\Http\Controllers;

use App\Models\Bebida;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BebidaController extends Controller
{
    /**
     * Listar todas las bebidas (con categoría si existe relación).
     */
    public function index()
    {
        $bebidas = Bebida::with('categoria')->get();
        return response()->json($bebidas);
    }

    /**
     * Guardar una nueva bebida.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre'       => 'required|string|max:30',
            'precio'       => 'required|numeric|min:0',
            'stock'        => 'nullable|integer|min:0',
            'estado'       => 'boolean',
            'categoria_id' => 'nullable|exists:categorias,id',
            'imagen'       => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data = $request->only(['nombre', 'precio', 'stock', 'estado', 'categoria_id']);

        if ($request->hasFile('imagen')) {
            $data['imagen'] = $request->file('imagen')->store('bebidas', 'public');
        }

        $bebida = Bebida::create($data);

        return response()->json($bebida, 201);
    }

    /**
     * Mostrar una bebida específica (con categoría).
     */
    public function show(Bebida $bebida)
    {
        return response()->json($bebida->load('categoria'));
    }

    /**
     * Actualizar una bebida.
     */
    public function update(Request $request, Bebida $bebida)
    {
        $request->validate([
            'nombre'       => 'sometimes|required|string|max:30',
            'precio'       => 'sometimes|required|numeric|min:0',
            'stock'        => 'nullable|integer|min:0',
            'estado'       => 'boolean',
            'categoria_id' => 'nullable|exists:categorias,id',
            'imagen'       => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data = $request->only(['nombre', 'precio', 'stock', 'estado', 'categoria_id']);

        if ($request->hasFile('imagen')) {
            // Eliminar imagen anterior si existe
            if ($bebida->imagen && Storage::disk('public')->exists($bebida->imagen)) {
                Storage::disk('public')->delete($bebida->imagen);
            }
            $data['imagen'] = $request->file('imagen')->store('bebidas', 'public');
        }

        $bebida->update($data);

        return response()->json($bebida);
    }

    /**
     * Eliminar una bebida.
     */
    public function destroy(Bebida $bebida)
    {
        if ($bebida->imagen && Storage::disk('public')->exists($bebida->imagen)) {
            Storage::disk('public')->delete($bebida->imagen);
        }

        $bebida->delete();

        return response()->json(null, 204);
    }
}
