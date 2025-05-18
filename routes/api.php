<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LinksApiController;

Route::prefix('api')->group(function () {
    Route::controller(LinksApiController::class)->group(function () {
        Route::get('/links/count', 'count');
        Route::get('/links', 'index');
    });
});