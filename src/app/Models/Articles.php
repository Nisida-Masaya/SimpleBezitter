<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Articles extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'context', 'article_image', 'created_at', 'create_user_id'];

    protected $table = 'articles';

    public static function getAllArticles()
    {
        return Articles::select([
            'articles.id as id', 'articles.context as context', 'articles.article_image as article_image',
            'articles.created_at', 'users.name as create_user_name', 'users.user_image', 'articles.create_user_id as create_user_id',
            'likes.article_id as like_article_id', 'likes.user_id as like_user_id'
        ])->selectRaw('count(likes.article_id) as like_count')
            ->join('users', 'articles.create_user_id', '=', 'users.id')
            ->leftJoin('likes', 'articles.id', '=', 'likes.article_id')
            ->groupBy('id')
            ->orderBy('id', 'desc')
            ->get();
    }

    public static function getMyGoodArticlesList()
    {
        return Articles::select([
            'articles.id', 'articles.context as context', 'articles.article_image as article_image',
            'articles.created_at', 'users.name as create_user_name', 'users.user_image', 'articles.create_user_id as create_user_id',
        ])
            ->join('users', 'articles.create_user_id', '=', 'users.id')
            ->join('likes', 'articles.id', '=', 'likes.article_id')
            ->orderBy('articles.id', 'desc')
            ->get();
    }

    public static function goodCountArticles()
    {
        return DB::table('likes')
            ->join('articles', 'likes.article_id', '=', 'articles.id')
            ->select('likes.article_id', 'likes.user_id', DB::raw('count(likes.article_id) as count'))
            ->groupBy('likes.article_id')
            ->get();
    }
}
