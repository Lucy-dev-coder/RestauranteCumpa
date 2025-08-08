<?php

namespace App\Http\Controllers;

use App\Models\Plato;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PlatoController extends Controller
{
    public function index()
    {
        // Devuelve todos los platos con su categoría
        $platos = Plato::with('categoria')->get();
        return response()->json($platos);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:30',
            'precio' => 'required|numeric|min:0',
            'estado' => 'boolean',
            'categoria_id' => 'nullable|exists:categorias,id',
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data = $request->only(['nombre', 'precio', 'estado', 'categoria_id']);

        if ($request->hasFile('imagen')) {
            $data['imagen'] = $request->file('imagen')->store('platos', 'public');
        }

        $plato = Plato::create($data);

        return response()->json($plato, 201);
    }

    public function show(Plato $plato)
    {
        return response()->json($plato->load('categoria'));
    }

    public function update(Request $request, Plato $plato)
    {
        $request->validate([
            'nombre' => 'sometimes|required|string|max:30',
            'precio' => 'sometimes|required|numeric|min:0',
            'estado' => 'boolean',
            'categoria_id' => 'nullable|exists:categorias,id',
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data = $request->only(['nombre', 'precio', 'estado', 'categoria_id']);

        if ($request->hasFile('imagen')) {
            if ($plato->imagen && Storage::disk('public')->exists($plato->imagen)) {
                Storage::disk('public')->delete($plato->imagen);
            }
            $data['imagen'] = $request->file('imagen')->store('platos', 'public');
        }

        $plato->update($data);

        return response()->json($plato);
    }

    public function destroy(Plato $plato)
    {
        if ($plato->imagen && Storage::disk('public')->exists($plato->imagen)) {
            Storage::disk('public')->delete($plato->imagen);
        }

        $plato->delete();

        return response()->json(null, 204);
    }
}
