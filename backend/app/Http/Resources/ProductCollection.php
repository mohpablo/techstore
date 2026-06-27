<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'short_description' => $product->short_description, 
                'price' => $product->price,
                'discount_price' => $product->discount_price,
                'stock' => $product->stock,
                'brand' => $product->brand,
                'status' => $product->status->value,
                'is_featured' => (bool) $product->is_featured,
                'category' => $product->category?->name ?? 'Uncategorized',
            ];
        })->all();
    }
}
