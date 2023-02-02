<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
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

    public static function getGoodMyLists(int $id)
    {
        return Articles::select([
            'articles.id as id', 'articles.context as context', 'articles.article_image as article_image',
            'articles.created_at', 'users.name as create_user_name', 'users.user_image', 'articles.create_user_id as create_user_id',
            'likes.article_id as like_article_id', 'likes.user_id as like_user_id'
        ])->selectRaw('count(likes.article_id) as like_count')
            ->join('users', 'articles.create_user_id', '=', 'users.id')
            ->rightJoin('likes', 'articles.id', '=', 'likes.article_id')
            ->where('likes.user_id', '=', $id)
            ->groupBy('id')
            ->orderBy('id', 'desc')
            ->get();
    }
}
