<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware(['auth'])->group(function () {
    Route::prefix('users')->group(function () {
        Route::get('/', function () {
            return Inertia::render('users/index');
        })->name('users.index');

        Route::get('/create', function () {
            return Inertia::render('users/create');
        })->name('users.create');

        Route::get('/{id}/edit', function ($id) {
            return Inertia::render('users/edit', [
                'user' => $id,
            ]);
        })->name('users.edit');

        Route::get('/{id}', function ($id) {
            return Inertia::render('users/show', [
                'user' => $id,
            ]);
        })->name('users.show');
    });
    // User Routes


    Route::get('/articles', function () {
        return Inertia::render('articles/index');
    })->name('articles.index');
});
