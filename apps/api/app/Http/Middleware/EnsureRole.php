<?php
namespace App\Http\Middleware;
use Closure; use Illuminate\Http\Request;
class EnsureRole {
    public function handle(Request $request, Closure $next, string ...$roles) {
        $user = $request->user();
        if (!$user) return response()->json(['message' => 'Unauthenticated.'], 401);
        if ($user->hasRole('super_admin')) return $next($request);
        if (!$user->hasAnyRole($roles)) return response()->json(['message' => 'This action is unauthorized for your role.'], 403);
        return $next($request);
    }
}
