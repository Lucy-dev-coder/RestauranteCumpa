<?php

namespace App\Http\Controllers;

use App\Models\Bebida;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BebidaController extends Controller
{
    /**
     * Listar todas las bebidas.
     */
    public function index()
    {
        $bebidas = Bebida::all();
        return response()->json($bebidas);
    }

    /**
     * Guardar una nueva bebida.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre'  => 'required|string|max:30',
            'precio'  => 'required|numeric|min:0',
            'stock'   => 'nullable|integer|min:0',
            'estado'  => 'required|boolean',
            'imagen'  => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data = $request->only(['nombre', 'precio', 'stock', 'estado']);

        if ($request->hasFile('imagen')) {
            $data['imagen'] = $request->file('imagen')->store('bebidas', 'public');
        }

        $bebida = Bebida::create($data);

        return response()->json($bebida, 201);
    }

    /**
     * Mostrar una bebida específica.
     */
    public function show(Bebida $bebida)
    {
        return response()->json($bebida);
    }

    /**
     * Actualizar una bebida.
     */
    public function update(Request $request, Bebida $bebida)
    {
        $request->validate([
            'nombre'  => 'sometimes|required|string|max:30',
            'precio'  => 'sometimes|required|numeric|min:0',
            'stock'   => 'nullable|integer|min:0',
            'estado'  => 'boolean',
            'imagen'  => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data = $request->only(['nombre', 'precio', 'stock', 'estado']);

        if ($request->hasFile('imagen')) {
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
