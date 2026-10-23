<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('currencies', function (Blueprint $t) { $t->id(); $t->char('code',3)->unique(); $t->string('name'); $t->string('symbol',8)->nullable(); $t->boolean('is_reporting')->default(false); $t->timestamps(); });
        Schema::create('exchange_rates', function (Blueprint $t) { $t->id(); $t->foreignId('from_currency_id')->constrained('currencies'); $t->foreignId('to_currency_id')->constrained('currencies'); $t->decimal('rate',18,8); $t->date('effective_date'); $t->string('source')->nullable(); $t->timestamps(); });
        Schema::create('campaign_categories', function (Blueprint $t) { $t->id(); $t->string('slug')->unique(); $t->string('name'); $t->text('description')->nullable(); $t->boolean('is_active')->default(true); $t->timestamps(); });
        Schema::create('campaigns', function (Blueprint $t) { $t->id(); $t->foreignId('category_id')->nullable()->constrained('campaign_categories')->nullOnDelete(); $t->string('slug')->unique(); $t->string('title'); $t->string('summary',500)->nullable(); $t->longText('description')->nullable(); $t->string('purpose')->nullable(); $t->decimal('target_amount',15,2)->default(0); $t->foreignId('currency_id')->constrained('currencies'); $t->string('status')->default('draft')->index(); $t->date('starts_at')->nullable(); $t->date('deadline')->nullable(); $t->foreignId('manager_id')->nullable()->constrained('users')->nullOnDelete(); $t->boolean('is_featured')->default(false); $t->string('cover_image_url',500)->nullable(); $t->timestamps(); });
        Schema::create('campaign_media', function (Blueprint $t) { $t->id(); $t->foreignId('campaign_id')->constrained()->cascadeOnDelete(); $t->string('url',500); $t->string('caption')->nullable(); $t->string('media_type')->default('image'); $t->integer('sort_order')->default(0); $t->timestamps(); });
        Schema::create('campaign_updates', function (Blueprint $t) { $t->id(); $t->foreignId('campaign_id')->constrained()->cascadeOnDelete(); $t->foreignId('author_id')->nullable()->constrained('users')->nullOnDelete(); $t->string('title'); $t->longText('body'); $t->boolean('is_published')->default(false); $t->timestamp('published_at')->nullable(); $t->timestamps(); });
        Schema::create('programs', function (Blueprint $t) { $t->id(); $t->foreignId('campaign_id')->nullable()->constrained()->nullOnDelete(); $t->string('name'); $t->text('description')->nullable(); $t->text('beneficiary_description')->nullable(); $t->text('eligibility')->nullable(); $t->string('location')->nullable(); $t->boolean('is_active')->default(true); $t->timestamps(); });
    }
    public function down(): void { foreach (['programs','campaign_updates','campaign_media','campaigns','campaign_categories','exchange_rates','currencies'] as $x) Schema::dropIfExists($x); }
};