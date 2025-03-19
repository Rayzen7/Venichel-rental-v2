<?php

use App\Http\Controllers\PenaltieContoller;
use App\Http\Controllers\RentController;
use App\Http\Controllers\ReturnController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('/a1')->group( function() {
    Route::post('/auth/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);
    
    Route::middleware('authLogin')->group( function() {
        Route::get('/auth/logout', [UserController::class, 'logout']);                
    });

    Route::middleware('auth')->group(function() {
        Route::get('/getuser', [UserController::class, 'getuser']);
        // admin
        Route::middleware('role:1')->group( function() {
            Route::get('/register', [UserController::class, 'index']);
            Route::get('/register/{id}', [UserController::class, 'show']);
            Route::put('/register/{id}', [UserController::class, 'update']);
            Route::delete('/register/{id}', [UserController::class, 'destroy']);

            Route::get('/rent', [RentController::class, 'index']);
            Route::post('/rent', [RentController::class, 'store']);
            Route::get('/rent/{id}', [RentController::class, 'show']);
            Route::put('/rent/{id}', [RentController::class, 'update']);
            Route::delete('/rent/{id}', [RentController::class, 'destroy']);

            Route::get('/penalties', [PenaltieContoller::class, 'index']);
            Route::post('/penalties', [PenaltieContoller::class, 'store']);
            Route::get('/penalties/{id}', [PenaltieContoller::class, 'show']);
            Route::put('/penalties/{id}', [PenaltieContoller::class, 'update']);
            Route::delete('/penalties/{id}', [PenaltieContoller::class, 'destroy']);

            Route::get('/return', [ReturnController::class, 'index']);
            Route::post('/return', [ReturnController::class, 'store']);
            Route::get('/return/{id}', [ReturnController::class, 'show']);
            Route::put('/return/{id}', [ReturnController::class, 'update']);
            Route::delete('/return/{id}', [ReturnController::class, 'destroy']);
        });

        // user
        Route::middleware('role:2')->group(function() {
            Route::get('/datauser', [UserController::class, 'getdatauser']);
        });
    });
});
