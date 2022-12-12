<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;


class Articles extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'context', 'article_image', 'created_at', 'create_user_id'];

    protected $table = 'articles';

    public static function getAllArticles()
    {
        return Articles::select([
            'articles.id', 'articles.context as context', 'articles.article_image as article_image',
            'articles.created_at', 'users.name as create_user_name', 'users.user_image', 'articles.create_user_id as create_user_id'
        ])
            ->join('users', 'articles.create_user_id', '=', 'users.id')
            ->orderBy('articles.id', 'desc')
            ->get();
    }
}
