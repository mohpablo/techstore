<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['user_id', 'address_id', 'order_number', 'subtotal', 'shipping_fee', 'discount', 'total', 'status', 'estimated_delivery_date', 'delivered_at', 'notes'])]
class Order extends Model
{
    use SoftDeletes;


    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function address()
    {
        return $this->belongsTo(Address::class);
    }
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
