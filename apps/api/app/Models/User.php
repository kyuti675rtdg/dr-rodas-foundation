<?php
namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable {
    use HasApiTokens, Notifiable;
    protected $fillable = ['name','email','password','status'];
    protected $hidden = ['password','remember_token'];
    protected function casts(): array { return ['email_verified_at' => 'datetime', 'password' => 'hashed']; }
    public function roles() { return $this->belongsToMany(Role::class, 'user_roles'); }
    public function hasRole(string $slug): bool { return $this->roles()->where('slug', $slug)->exists(); }
    public function hasAnyRole(array $slugs): bool { return $this->roles()->whereIn('slug', $slugs)->exists(); }
    public function donorProfile() { return $this->hasOne(DonorProfile::class); }
    public function donations() { return $this->hasMany(Donation::class); }
}
