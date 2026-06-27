<?php

namespace App\Http\Controllers\Api\v1;

use App\Enums\ProductStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductCollection;
use App\Models\Product;
use Illuminate\Http\Request;


class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $products = Product::with('category:id,name')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->when($request->status, function ($query, $status) {
                $statusEnum = ProductStatusEnum::tryFrom($status);
                if ($statusEnum) {
                    $query->where('status', $statusEnum);
                }
            })
            ->when($request->archived, function ($query) {
                $query->onlyTrashed();
            })
            ->latest()
            ->paginate(5)
            ->withQueryString();
        return response()->json(
            [
                'data' => new ProductCollection($products),
                'meta' => [
                    'current_page' => $products->currentPage(),
                    'last_page' => $products->lastPage(),
                    'total' => $products->total(),
                ]
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
