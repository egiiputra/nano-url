<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\UniqueConstraintViolationException;
use Inertia\Inertia;
use Closure;
use DateTime;
use DateInterval;

class LinkController extends Controller
{
    public function redirect($short_url) 
    {
        $long_url = DB::scalar('select long_url from links where short_url = ?', [$short_url]);
        
        if (is_null($long_url)) {
            return Inertia::render('notfound');
        }

        // TODO: Add counter in current data for this short url
        return redirect($long_url);
    }

    public function store(Request $request) 
    {
        // TODO: Check if short url is reserved path, if true than it fail
        
        // Check if short url is unique, if not than it fail
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

        // TODO: Validate make sure there is no '/', '&', '?' and whitespace

        // TODO insert time stamp value into DB
        $expiredDate = date_add(
            new \DateTime(),
            new \DateInterval('P' . ($request->expired ?? 10) . 'D')
        )->format("Y-m-d H:i:s");

        $res = DB::insert('insert into links (user_id, short_url, long_url, expired_at) values (?, ?, ?, ?)', [
            $request->user_id,
            $request->short_url,
            $request->long_url,
            $expiredDate,
        ]);
    }
}
