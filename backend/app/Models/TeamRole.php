<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TeamRole extends Model
{
    use HasFactory, SoftDeletes;

    public function members()
    {
        return $this->hasMany(Member::class);
    }
}
