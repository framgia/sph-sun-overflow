<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Question extends Model
{
    use HasFactory, SoftDeletes;

    const OPEN = 0;
    const CLOSED = 1;
    const DUPLICATE = 2;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
