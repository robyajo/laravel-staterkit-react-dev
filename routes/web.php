<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;



Route::prefix('api')->group(function () {
    // Public API Routes

    // Protected API Routes
    Route::middleware(['auth', 'verified'])->group(function () {
        // User API Routes
        Route::prefix('users')->controller(UserController::class)->group(function () {
            Route::get('/', 'index');
        });
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/pages.php';
