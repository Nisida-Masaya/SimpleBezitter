<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    /**
     * Handle an authentication attempt.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return response()->json(Auth::user());
        }
        return response()->json([], 401);
    }

    /**
     * Log the user out of the application.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return \response()->json(true);
    }

    public function isAuth()
    {
        //Auth::check()
        //ログインしているか判定してくれる boolean
        return response()->json(Auth::check());
    }

    public function getLoginUser(Request $request)
    {
        $loginUser = Auth::user();

        return $loginUser ? response()->json($loginUser, 201) : response()->json($request, 500);
    }

       /**
     * Update the specified resource in storage.
     *
     * @param  \App\Models\User
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'max:30',
            'introduction' => 'max:500'
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->toArray();
            $response['errors'] = ['name' => [], 'introduction' => []];
            foreach ($errors as $error_key => $error) {
                $response['errors'][$error_key] = $error;
            };
            return response()->json($response, 401);
        }

        $user = new User();

        $user->where('id', '=', $request->input('id'))
            ->update([
                'name' => $request->input('name'),
                'introduction' => $request->input('introduction'),
            ]);
    }
}
