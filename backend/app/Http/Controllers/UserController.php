<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::where('role_id', 2)->get();
        return response()->json([
            'user' => $user
        ], 200);
    }

    public function getuser() 
    {
        $user = Auth::user();
        return response()->json([
            'user' => $user
        ], 200);
    }

    public function getdatauser()
    {
        $user = Auth::user();
        $datauser = User::with('rent', 'return', 'penalties')->where('id', $user->id)->get();
        return response()->json([
            'datauser' => UserResource::collection($datauser)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function register(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'username' => 'required',
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'no_ktp' => 'required',
            'date_of_birth' => 'required',
            'phone' => 'required|numeric',
            'description' => 'required',
            'role_id' => 'exists:roles,id'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Fields'
            ], 422);
        }

        User::create([
            'no_ktp' => $request->no_ktp,
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'date_of_birth' => $request->date_of_birth,
            'phone' => $request->phone,
            'description' => $request->description,
            'role_id' => 2,
            'password' => bcrypt($request->password)
        ]);

        return response()->json([
            'message' => 'Create Register Success'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::findOrFail($id);
        return response()->json([
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function login(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Login'
            ], 401);
        }

        if (Auth::attempt($request->only('username', 'password'))) {
            $user = User::where('username', $request->username)->first();
            $token = $user->createToken('access_token')->plainTextToken;
            return response()->json([
                'message' => 'Login Success',
                'token' => $token,
                'user' => $user
            ], 200);
        }

        return response()->json([
            'message' => 'Invalid Login'
        ], 401);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        $validateData = Validator::make($request->all(), [
            'username' => 'required',
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'no_ktp' => 'required',
            'date_of_birth' => 'required',
            'phone' => 'required|numeric',
            'description' => 'required',
            'role_id' => 'exists:roles,id'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Fields'
            ], 422);
        }

        $user->update([
            'no_ktp' => $request->no_ktp,
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'date_of_birth' => $request->date_of_birth,
            'phone' => $request->phone,
            'description' => $request->description,
            'role_id' => 2,
            'password' => bcrypt($request->password)
        ]);

        return response()->json([
            'message' => 'Edit Register Success'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function logout(Request $request)
    {
        $token = PersonalAccessToken::findToken($request->bearerToken());
        $token->delete();
        return response()->json([
            'message' => 'Logout Success'
        ], 200);
    }

    public function destroy(string $id) {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json([
            'message' => 'Delete Register Success'
        ], 200);
    }
}
