<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::table('users', function (Blueprint $t) { $t->string('status')->default('active'); });
        Schema::create('roles', function (Blueprint $t) { $t->id(); $t->string('slug')->unique(); $t->string('name'); $t->string('description')->nullable(); $t->timestamps(); });
        Schema::create('permissions', function (Blueprint $t) { $t->id(); $t->string('slug')->unique(); $t->string('name'); $t->timestamps(); });
        Schema::create('role_permissions', function (Blueprint $t) { $t->foreignId('role_id')->constrained()->cascadeOnDelete(); $t->foreignId('permission_id')->constrained()->cascadeOnDelete(); $t->primary(['role_id','permission_id']); });
        Schema::create('user_roles', function (Blueprint $t) { $t->foreignId('user_id')->constrained()->cascadeOnDelete(); $t->foreignId('role_id')->constrained()->cascadeOnDelete(); $t->primary(['user_id','role_id']); });
        Schema::create('donor_profiles', function (Blueprint $t) { $t->id(); $t->foreignId('user_id')->nullable()->unique()->constrained()->nullOnDelete(); $t->string('full_name'); $t->string('email')->nullable(); $t->string('phone')->nullable(); $t->string('country')->nullable(); $t->boolean('public_recognition')->default(false); $t->boolean('marketing_opt_in')->default(false); $t->boolean('updates_opt_in')->default(true); $t->timestamps(); });
    }
    public function down(): void { Schema::dropIfExists('donor_profiles'); Schema::dropIfExists('user_roles'); Schema::dropIfExists('role_permissions'); Schema::dropIfExists('permissions'); Schema::dropIfExists('roles'); }
};