<?php
namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use App\Models\{DonorProfile, Role, User};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
class AuthController extends Controller {
    public function register(Request $r) {
        $d = $r->validate(['name' => 'required|string|max:160', 'email' => 'required|email|unique:users,email', 'password' => 'required|string|min:8', 'country' => 'nullable|string|max:80']);
        $user = User::create(['name' => $d['name'], 'email' => $d['email'], 'password' => $d['password']]);
        if ($donor = Role::where('slug', 'donor')->first()) $user->roles()->attach($donor->id);
        DonorProfile::create(['user_id' => $user->id, 'full_name' => $user->name, 'email' => $user->email, 'country' => $d['country'] ?? null]);
        return response()->json(['token' => $user->createToken('web')->plainTextToken, 'user' => $this->present($user)], 201);
    }
    public function login(Request $r) {
        $d = $r->validate(['email' => 'required|email', 'password' => 'required|string']);
        $user = User::where('email', $d['email'])->first();
        if (!$user || !Hash::check($d['password'], $user->password)) throw ValidationException::withMessages(['email' => ['The provided credentials are incorrect.']]);
        return response()->json(['token' => $user->createToken('web')->plainTextToken, 'user' => $this->present($user)]);
    }
    public function me(Request $r) { return response()->json(['user' => $this->present($r->user())]); }
    public function logout(Request $r) { $r->user()->currentAccessToken()->delete(); return response()->json(['message' => 'Logged out.']); }
    private function present(User $u): array { return ['id' => $u->id, 'name' => $u->name, 'email' => $u->email, 'roles' => $u->roles()->pluck('slug')]; }
}
