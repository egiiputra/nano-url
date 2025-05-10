<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LinkController extends Controller
{
    public function redirect($short_url) {
        $urls = DB::select('select long_url from links where short_url = ?', [$short_url]);
        
        // Redirect to 404 page if not found
        var_dump($urls);
        return redirect($urls[0]->long_url);
        // return view('user.index', ['users' => $users]);
    }

    public function store(Request $request) {
        // return $request;
        // Check if short url is reserved path, if true than it fail
        
        // Check if short url is unique, if not than it fail
        // Add validation if long_url is a valid url
        if (!isset($request->user_id)) {
            $res = DB::insert('insert into links (user_id, short_url, long_url) values (?, ?, ?)', [
                null,
                $request->short_url,
                $request->long_url
            ]);
        } else {
            $res = DB::insert('insert into links (user_id, short_url, long_url) values (?, ?, ?)', [
                $request->user_id,
                $request->short_url,
                $request->long_url
            ]);
        }
        return isset($request->user_id);
    }
}
