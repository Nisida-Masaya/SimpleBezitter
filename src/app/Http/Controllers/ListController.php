<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticlesRequest;
use App\Http\Requests\UpdateArticlesRequest;
use App\Http\Requests\ArticlesRequest;
use Illuminate\Http\Request;
use App\Models\Articles;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //ログインしているユーザID
        $loginUserId = Auth::id();

        $articles = new Articles();
        $goodList = $articles->getGoodMyLists((int) $loginUserId);

        return $goodList ? response()->json($goodList, 201) : response()->json([], 500);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getGoodList(Request $request)
    {
        //ログインしているユーザID
        $loginUserId = Auth::id();

        $articles = new Articles();
        $goodList = $articles->getMyGoodArticleLists();
        // dd($goodList);

        return $goodList ? response()->json($goodList, 201) : response()->json($request, 500);

    }


}
