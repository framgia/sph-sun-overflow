<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Permission extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($permission) {
            $permission->slug = Str::slug($permission->name);
        });

        static::updating(function ($permission) {
            $permission->slug = Str::slug($permission->name);
        });
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'permission_role');
    }
}
