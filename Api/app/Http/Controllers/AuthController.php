<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Helpers\HStatusHttp;
use App\Models\Deal;
use App\Models\User;
use App\Models\UserCard;
use Storage;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);
        $this->checkActiveUserPanamaAsistencia();
        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = auth()->user();
        $user->role = User::getRoleFromUser($user);
        $user->user_cards = UserCard::getAllcardsFromUser($user);

        return response()->json(
            [
                'token' => $this->respondWithToken($token),
                'data' => [
                    'user' => $user,
                    'deals' => Deal::getDeals()
                ]
            ]
        );
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        
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
            'avatar_file_name' => ''
        ];

        $user = User::create($user_data);

        $data = [
            'code' => HStatusHttp::OK,
            'data' => [
                'user' => $user
            ]
        ];

        return response()->json($data);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ];
    }

    public function checkActiveUserPanamaAsistencia () {
        return true;
    }
}