<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Table('products_images')]
#[Fillable(['product_id', 'image_url'])]
class ProductImage extends Model
{
    use SoftDeletes;


    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
