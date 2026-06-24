<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['product_id', 'spec_key', 'spec_value'])]
class ProductSpecification extends Model
{
    use SoftDeletes;


    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
