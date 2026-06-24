<?php

use App\Http\Controllers\Api\v1\CategoriesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\v1\UsersController;
use App\Http\Controllers\Api\v1\WebAuthControllerAuthController;

Route::prefix('v1')->group(
    function () {
        Route::post('/login', [WebAuthControllerAuthController::class, 'login']);
        Route::post('/register', [WebAuthControllerAuthController::class, 'register']);
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('/logout', [WebAuthControllerAuthController::class, 'logout']);
            Route::get('/user', function (Request $request) {
                return $request->user();
            });
            Route::apiResource('users', UsersController::class);
            Route::get('/users/{user}/archive', [UsersController::class, 'archive']);
            Route::get('/users/{user}/restore', [UsersController::class, 'restore'])->withTrashed();
            Route::apiResource('categories', CategoriesController::class);
            Route::get('/categories/{category}/archive', [CategoriesController::class, 'archive']);
            Route::get('/categories/{category}/restore', [CategoriesController::class, 'restore'])->withTrashed();
        });
    }
);
