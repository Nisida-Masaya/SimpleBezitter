<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'user_image',
        'introduction'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    //多対多のリレーションを書く
    public function likes()
    {
        return $this->belongsToMany('App\Models\Articles', 'likes', 'user_id', 'article_id')->withTimestamps();
    }

    //この投稿に対して既にlikeしたかどうかを判別する
    public function isLike($articleId)
    {
        return $this->likes()->where('article_id', $articleId)->exists();
    }

    //isLikeを使って、既にlikeしたか確認したあと、いいねする（重複させない）
    public function like($articleId)
    {
        if ($this->isLike($articleId)) {
            //もし既に「いいね」していたら何もしない
        } else {
            $this->likes()->attach($articleId);
        }
    }

    //isLikeを使って、既にlikeしたか確認して、もししていたら解除する
    public function unlike($articleId)
    {
        if ($this->isLike($articleId)) {
            //もし既に「いいね」していたら消す
            $this->likes()->detach($articleId);
        } else {
        }
    }
}
