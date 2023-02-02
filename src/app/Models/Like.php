<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class Like extends Model
{
    use HasFactory;

    protected $table = 'likes';

    protected $fillable = ['article_id', 'user_id'];

}
