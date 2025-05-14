<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    Route::controller(LinksApiController::class)->group(function () {
        Route::get('/links', 'index');
        // Route::post('/orders', 'store');
    });
})->middleware('auth:sanctum');