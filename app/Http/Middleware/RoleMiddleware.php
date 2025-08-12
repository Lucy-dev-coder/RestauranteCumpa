<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $roles): Response
    {
        $userRole = $request->user()->rol;

        // Siempre permitir si es Administrador
        if ($userRole === 'admin') {
            return $next($request);
        }

        // Separar los roles permitidos en un array (por si vienen separados por coma)
        $rolesArray = explode(',', str_replace(' ', '', $roles)); // también quita espacios

        // Si el rol del usuario NO está en los roles permitidos, abortar
        if (!in_array($userRole, $rolesArray)) {
            abort(403, 'Acceso no autorizado');
        }

        return $next($request);
    }
}
