<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\LinkController;

Route::get('/', function () {
    return Inertia::render('home', [
        'app_url' => env('APP_URL')
    ]);
})->name('home');

Route::get('/welcome', function () {
    return Inertia::render('welcome');
})->name('welcome');


// Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::post('/create-nano-url', [LinkController::class, 'store'])->name('link.create');
Route::get('/{short_url}', [LinkController::class, 'redirect'])->name('link.redirect');