<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LinkController extends Controller
{
    public function redirect($short_url) {
        $urls = DB::select('select original_url from links where short_url = ?', [$short_url]);
        
        // Redirect to 404 page if not found
        var_dump($urls);
        return redirect($urls[0]->original_url);
        // return view('user.index', ['users' => $users]);
    }

    public function store() {
        // Check if short url is reserved path, if true than it fail
        // Check if short url is unique, if not than it fail
    }
}
