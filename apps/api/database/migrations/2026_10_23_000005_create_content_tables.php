<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('publications', function (Blueprint $t) {
            $t->id();
            $t->string('slug')->unique();
            $t->string('title');
            $t->string('author')->nullable();
            $t->string('summary', 500)->nullable();
            $t->longText('body')->nullable();
            $t->string('category')->nullable()->index();
            $t->string('topic')->nullable()->index();
            $t->string('cover_image_url', 500)->nullable();
            $t->string('file_url', 500)->nullable(); // set only when a download is authorized
            $t->boolean('is_featured')->default(false);
            $t->boolean('is_published')->default(false)->index();
            $t->timestamp('published_at')->nullable();
            $t->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $t->timestamps();
        });
        Schema::create('news_articles', function (Blueprint $t) {
            $t->id();
            $t->string('slug')->unique();
            $t->string('title');
            $t->string('subtitle')->nullable();
            $t->string('author')->nullable();
            $t->string('summary', 500)->nullable();
            $t->longText('body');
            $t->string('category')->nullable()->index();
            $t->string('featured_image_url', 500)->nullable();
            $t->string('featured_image_alt')->nullable();
            $t->boolean('is_featured')->default(false);
            $t->boolean('is_published')->default(false)->index();
            $t->timestamp('published_at')->nullable();
            $t->foreignId('author_id')->nullable()->constrained('users')->nullOnDelete();
            $t->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('news_articles'); Schema::dropIfExists('publications'); }
};
