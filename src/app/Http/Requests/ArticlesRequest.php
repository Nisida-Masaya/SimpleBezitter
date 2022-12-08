<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticlesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'context' => 'required|max:300'
        ];
    }

    public function attributes()
    {
        return [
            'context' => '投稿内容',
            'article_image' => '投稿写真'
        ];
    }
}
