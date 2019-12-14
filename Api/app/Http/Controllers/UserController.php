<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\HStatusHttp;
use App\Helpers\HPath;
use App\Helpers\HRole;
use App\Jobs\GetImages;
use App\Jobs\SaveImage;
use App\Models\User;
use App\Models\RoleUser;
use Illuminate\Support\Facades\Mail;
use App\Mail\Register;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::getAllUserWithRoles();
    
        $data = [
            'code' => HStatusHttp::OK,
            'data' => [
                'users' => $users
            ]
        ];
        
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function prepareCreateOrUpdateData( Request $request, $user_id = null )
    {

        if($user_id) {
            if ( !$user=User::find($user_id) ) {
                return response()->json([
                    'code' => HStatusHttp::NOT_FOUND,
                    'message' => 'Usuario no encontrado'
                ]);            
            }   
        }
        
        if( $validator_result = $this->validateData( $request, User::rules($user_id), trans('validation') )) {
          return $validator_result;  
        }

        $user_data = [
            'name' => $request->name,
            'last_name' => $request->last_name,
            'dni' => $request->dni,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'phone' => $request->phone,
            'username' => $request->username,
            'address' => $request->address,
            'policy' => $request->policy,
            'avatar_file_name' => $user_id ? $user->avatar_file_name : ''
        ];

        $role_user_data = [
            'user_id' => $user_id ? $user_id : null,
            'role_id' => $request->role ? $request->role : HRole::CLIENTE
        ];

        if(!$user_id){
            $user = $this->create($user_data);

            $full_path = 'public/' . HPath::AVATAR_USER . '/'. $user->id;
            if($request->avatar_file_name) {
                $user->avatar_file_name = SaveImage::dispatchNow($request->avatar_file_name, $full_path);
                $user->save();
            }
            $role_user_data['user_id'] = $user->id;

            RoleUser::create($role_user_data);

            Mail::to($user)->send(new Register($user));
            
        } else {
            
            $user = $this->update($user, $user_data);
            if($request->avatar_file_name) {
                $user->avatar_file_name = SaveImage::dispatchNow($request->avatar_file_name, $full_path);
                $user->save();
            }
            RoleUser::updateRoleFromUser($role_user_data);
        }

        $user->role = User::getRoleFromUser($user);

        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'user' => $user
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create($user_data)
    {
        return  User::create($user_data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function get($user_id)
    {
        if ( !$user=User::find($user_id) ) {
            return response()->json([
                'code' => HStatusHttp::NOT_FOUND,
                'message' => 'Usuario no encontrado'
            ]);            
        }
        
        $user->role = User::getRoleFromUser($user);

        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'user' => $user
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($user, $user_data)
    {
        $user->fill($user_data)->save();
        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($user_id)
    {

        if ( !$user=User::find($user_id) ) {
            return response()->json([
                'code' => HStatusHttp::NOT_FOUND,
                'message' => 'Usuario no encontrado'
            ]);            
        }
        
        $user->delete();

        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'message' => trans('user.deleted')
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getUserByRole($role_id)
    {
        $users = User::join('role_users', 'role_users.user_id', '=', 'users.id')
        ->where('role_users.role_id', '=', $role_id)
        ->select('users.id', 'users.name', 'users.last_name', 'users.email')
        ->get();
        return response()->json([
            'code' => HStatusHttp::OK,
            'data' => [
                'users' => $users
            ]
        ]);
    }
    public function purchases($user_id)
    {
        $user = User::with('purchases')->find($user_id);
        
        $data = [
            'code' => HStatusHttp::OK,
            'data' => [
                'user' => $user
            ]
        ];
        
        return response()->json($data);
    }

}
