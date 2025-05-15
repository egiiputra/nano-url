<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LinksApiController;

Route::prefix('api')->group(function () {
    Route::middleware('auth:sanctum')->group(function() {
        Route::controller(LinksApiController::class)->group(function () {
            Route::get('/links/count', 'count');
            Route::get('/links', 'index');
            // Route::post('/orders', 'store');
        });
    });
});