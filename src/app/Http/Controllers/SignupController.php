<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticlesRequest;
use App\Http\Requests\UpdateArticlesRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class SignupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return User::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  SignupRequest
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'max:30',
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => 'max:15',
            'user_image' => ['nullable', 'max:1024', 'mimes:jpg,jpeg,png,gif']
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->toArray();
            $response['errors'] = ['name' => [], 'email' => [], 'password' => [], 'file_name' => [], 'introduction' => []];
            foreach ($errors as $error_key => $error) {
                $response['errors'][$error_key] = $error;
            };
            return response()->json($response, 401);
        }

        if ($request->file('user_image')) {
            $file = $request->file('user_image');
            $file_name = $file->getClientOriginalName();
            $request->file('user_image')->storeAs('public/images', $file_name);
        }

        $signup = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'user_image' => 'storage/' . 'images/' . $file_name,
            'introduction' => $request->input('introduction')
        ]);

        // dd($signup);

        return $signup ? response()->json($signup, 201) : response()->json([], 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User
     * @return \Illuminate\Http\Response
     */
    public function show(Articles $articles)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User
     * @return \Illuminate\Http\Response
     */
    public function edit(Articles $articles)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateArticlesRequest  $request
     * @param  \App\Models\User
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateArticlesRequest $request, Articles $articles)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User
     * @return \Illuminate\Http\Response
     */
    public function destroy(Articles $articles)
    {
        //
    }
}