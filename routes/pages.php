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
    // User Routes
    Route::get('/users', function () {
        return Inertia::render('users/index');
    })->name('users.index');

    Route::get('/articles', function () {
        return Inertia::render('articles/index');
    })->name('articles.index');
});
