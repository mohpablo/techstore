<?php

namespace App\Models;

use App\Enums\ProductStatusEnum;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['category_id', 'name', 'description', 'short_description', 'price', 'discount_price', 'stock', 'brand', 'status', 'is_featured'])]
class Product extends Model
{
    use SoftDeletes;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id');
    }
    public function specs()
    {
        return $this->hasMany(ProductSpecification::class);
    }

    protected function casts()
    {
        return [
            'status' => ProductStatusEnum::class
        ];
    }
}
