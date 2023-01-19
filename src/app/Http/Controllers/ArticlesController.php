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

class ArticlesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $loginUser = Auth::user();

        $articles = new Articles();
        $all_articles = $articles->getAllArticles();
        // dd($articles);

        return $all_articles ? response()->json($all_articles, 201) : response()->json($request, 500);
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
     * @param  ArticleRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'context' => 'unique:articles|max:255',
        ]);

        if ($validator->fails()) {
        }
        //ログインユーザ取得
        $loginUser = Auth::user();


        if ($request->file('article_image')) {
            $file = $request->file('article_image');
            $file_name = $file->getClientOriginalName();
            $request->file('article_image')->storeAs('public/images', $file_name);

            $article = Articles::create([
                'context' => $request->input('context'),
                'article_image' => 'storage/' . 'images/' . $file_name,
                'create_user_id' => $loginUser->id,
            ]);
        } else {
            $article = Articles::create([
                'context' => $request->input('context'),
                'create_user_id' => $loginUser->id,
            ]);
        }


        return $article ? response()->json($article, 201) : response()->json($request, 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Articles  $articles
     * @return \Illuminate\Http\Response
     */
    public function show(Articles $articles)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Articles  $articles
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
     * @param  \App\Models\Articles  $articles
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateArticlesRequest $request, Articles $articles)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Articles  $articles
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $article = Articles::find($id);

        return $article->delete() ? response()->json($article)
            : response()->json([], 500);
    }
}
