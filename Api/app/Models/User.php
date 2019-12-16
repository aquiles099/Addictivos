<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Validation\Rule;
use App\Models\Purchase;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 
        'last_name',
        'email', 
        'password',
        'dni',
        'avatar_file_name',
        'phone',
        'username',
        'address',
        'policy',
        'policy_date_end',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public static function rules ($user_id,$method) {
        return [
            'name' => 'required|string',
            'last_name' => 'required|string',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($user_id)
            ],
            'password' => !$user_id ? 'required|string' : '',
            'dni' => [
                'required',
                'string',
                $method=='POST'?Rule::unique('users')->ignore($user_id):''
            ],
            'avatar_file_name' => $method=='POST'?'image':'',
            'phone' => 'required|string',
            'username' => 'required|string',
            'address' => 'required|string',
            'policy' => [
                'required',
                $method=='POST'?Rule::unique('users')->ignore($user_id):''
            ],
            'policy_date_end' => 'date'
        ];
    }

    public function message () {

    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public static function getAllUserWithRoles() {
        $users = User::all();
        $users = User::getRolesFromUsers($users);
        return $users;
    }

    public static function getRolesFromUsers( $users ) {
        
        foreach( $users as $user ) {
            $user->role = User::getRoleFromUser($user);
        }

        return $users;
    }

    public static function getRoleFromUser($user) {
        $role = Role::query()
            ->join('role_users', 'role_users.role_id', '=', 'roles.id')
            ->where('role_users.user_id', '=', $user->id)
            ->select('roles.name')
            ->first();
        
        return $role->name;
    }
    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }
}
