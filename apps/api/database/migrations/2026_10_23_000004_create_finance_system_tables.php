<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('fund_disbursements', function (Blueprint $t) { $t->id(); $t->foreignId('campaign_id')->constrained(); $t->foreignId('program_id')->nullable()->constrained()->nullOnDelete(); $t->decimal('amount',15,2); $t->foreignId('currency_id')->constrained('currencies'); $t->string('purpose'); $t->string('status')->default('pending_approval'); $t->foreignId('prepared_by')->nullable()->constrained('users')->nullOnDelete(); $t->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete(); $t->timestamp('disbursed_at')->nullable(); $t->string('supporting_document_url',500)->nullable(); $t->timestamps(); });
        Schema::create('financial_approvals', function (Blueprint $t) { $t->id(); $t->string('approvable_type'); $t->unsignedBigInteger('approvable_id'); $t->foreignId('approver_id')->nullable()->constrained('users')->nullOnDelete(); $t->string('decision'); $t->text('notes')->nullable(); $t->timestamp('decided_at')->nullable(); $t->timestamps(); $t->index(['approvable_type','approvable_id']); });
        Schema::create('notification_logs', function (Blueprint $t) { $t->id(); $t->foreignId('user_id')->nullable()->constrained()->nullOnDelete(); $t->string('email')->nullable(); $t->string('channel')->default('email'); $t->string('template'); $t->string('subject')->nullable(); $t->string('status')->default('queued'); $t->timestamp('sent_at')->nullable(); $t->text('failure_reason')->nullable(); $t->string('dedupe_key')->nullable()->unique(); $t->timestamps(); });
        Schema::create('audit_logs', function (Blueprint $t) { $t->id(); $t->foreignId('user_id')->nullable()->constrained()->nullOnDelete(); $t->string('action'); $t->string('auditable_type')->nullable(); $t->unsignedBigInteger('auditable_id')->nullable(); $t->json('old_values')->nullable(); $t->json('new_values')->nullable(); $t->string('ip_address',45)->nullable(); $t->timestamps(); $t->index(['auditable_type','auditable_id']); });
        Schema::create('system_settings', function (Blueprint $t) { $t->id(); $t->string('key')->unique(); $t->text('value')->nullable(); $t->timestamps(); });
    }
    public function down(): void { foreach (['system_settings','audit_logs','notification_logs','financial_approvals','fund_disbursements'] as $x) Schema::dropIfExists($x); }
};