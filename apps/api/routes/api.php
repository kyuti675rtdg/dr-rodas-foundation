<?php
use App\Http\Controllers\Api\V1\{AuthController, DonationController, DonorController, PublicCampaignController, WebhookController};
use App\Http\Controllers\Api\V1\Admin\{CampaignAdminController, FinanceController};
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Public
    Route::get('campaigns', [PublicCampaignController::class, 'index']);
    Route::get('campaigns/{slug}', [PublicCampaignController::class, 'show']);
    Route::get('categories', [PublicCampaignController::class, 'categories']);
    Route::get('updates', [PublicCampaignController::class, 'updates']);
    Route::get('payment-methods', [PublicCampaignController::class, 'paymentMethods']);
    Route::get('transparency', [PublicCampaignController::class, 'transparency']);
    Route::get('donations/{reference}', [DonationController::class, 'show']);
    Route::post('donations', [DonationController::class, 'store'])->middleware('throttle:30,1');
    // Webhooks (signature-verified inside the controller; no session auth)
    Route::post('webhooks/{provider}', [WebhookController::class, 'handle']);
    // Auth
    Route::post('auth/register', [AuthController::class, 'register']);
    Route::post('auth/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('auth/me', [AuthController::class, 'me']);
        Route::post('auth/logout', [AuthController::class, 'logout']);
        Route::get('donor/donations', [DonationController::class, 'history']);
        Route::get('donor/profile', [DonorController::class, 'profile']);
        Route::put('donor/profile', [DonorController::class, 'updateProfile']);
        Route::get('donor/recurring', [DonorController::class, 'recurring']);
        Route::post('donor/recurring/{recurring}/cancel', [DonorController::class, 'cancelRecurring']);
        // Admin
        Route::middleware('role:foundation_admin,campaign_manager,finance_officer,auditor')->prefix('admin')->group(function () {
            Route::get('campaigns', [CampaignAdminController::class, 'index']);
            Route::middleware('role:foundation_admin,campaign_manager')->group(function () {
                Route::post('campaigns', [CampaignAdminController::class, 'store']);
                Route::put('campaigns/{campaign}', [CampaignAdminController::class, 'update']);
                Route::delete('campaigns/{campaign}', [CampaignAdminController::class, 'destroy']);
                Route::post('campaigns/{campaign}/updates', [CampaignAdminController::class, 'storeUpdate']);
            });
            Route::middleware('role:foundation_admin,finance_officer,auditor')->group(function () {
                Route::get('finance/summary', [FinanceController::class, 'summary']);
                Route::get('finance/donations', [FinanceController::class, 'donations']);
                Route::get('audit-logs', [FinanceController::class, 'auditLogs']);
            });
            Route::post('finance/disbursements', [FinanceController::class, 'storeDisbursement'])->middleware('role:foundation_admin,finance_officer');
            Route::post('finance/disbursements/{disbursement}/approve', [FinanceController::class, 'approveDisbursement'])->middleware('role:foundation_admin');
        });
    });
});
