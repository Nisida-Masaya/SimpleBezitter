<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    public function loginUser(){
        //ログインユーザ取得
        if(!Auth::check()){
            return response()->json(false);
        }
        return response()->json();
        return response()->json(Auth::user());
    }
}
