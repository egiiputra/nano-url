<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Closure;
use Illuminate\Database\UniqueConstraintViolationException;
use Inertia\Inertia;

class LinkController extends Controller
{
    public function redirect($short_url) 
    {
        $long_url = DB::scalar('select long_url from links where short_url = ?', [$short_url]);
        
        if (is_null($long_url)) {
            return Inertia::render('notfound');
        }
        return redirect($long_url);
    }

    public function store(Request $request) 
    {
        // $res = DB::select("select * from links where short_url = ?", [$request->short_url]);
        // return $res;
        // function (Validator $validator) {
        //     if ($this->somethingElseIsInvalid()) {
        //         $validator->errors()->add(
        //             'field',
        //             'Something is wrong with this field!'
        //         );
        //     }
        // }
        // return $request;
        // Check if short url is reserved path, if true than it fail
        
        // Check if short url is unique, if not than it fail
        // Add validation if long_url is a valid url
        // var_dump($request);
        $request->validate([
            'short_url' => [
                'required',
                'string',
                'max:100',
                function (string $attribute, mixed $value, Closure $fail) {
                    $url = DB::scalar("select short_url from links where short_url = ?", [$value]);
                    if (!is_null($url)) {
                        $fail("Short url is already used");
                    }
                }
            ],
            'long_url' => 'required|url|max:100'
        ]);
        // $validator = Validator::make($request->all(), [
            // 'title' => 'required|unique:posts|max:255',
            // 'body' => 'required',
        // ])->validate();
        // if (!isset($request->user_id)) {
        //     $res = DB::insert('insert into links (user_id, short_url, long_url) values (?, ?, ?)', [
        //         null,
        //         $request->short_url,
        //         $request->long_url
        //     ]);
        // } else {
        
        // $validator->after(function ($validator) {
        // try {
        //     $res = DB::insert('insert into links (user_id, short_url, long_url) values (?, ?, ?)', [
        //         $request->user_id,
        //         $request->short_url,
        //         $request->long_url
        //     ]);
        // } catch (UniqueConstraintViolationException $e) {
        //     $validator->errors()->add(
        //         'short_url', 'Short URL is already exists'
        //     );
        // }
        // });
        // return isset($request->user_id);
    }
}
