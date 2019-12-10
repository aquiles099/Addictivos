<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoleUser extends Model
{
    protected $fillable = [
        'user_id',
        'role_id'
    ];

    public static function updateRoleFromUser($role_user_data) {

        $role_user = RoleUser::where('role_users.user_id', '=', $role_user_data['user_id'])
            ->first();
        
        $role_user->fill($role_user_data)->save();
    }
}
