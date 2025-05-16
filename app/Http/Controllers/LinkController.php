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
        // FIXME: specifying for short url that not expired
        $res = DB::select('select id, long_url from links where short_url = ?', [$short_url]);
        
        if (count($res) == 0) {
            return Inertia::render('notfound');
        }

        // Check whether counter link for today already exists or not
        $today_date = date('Y-m-d');
        $analytics = DB::select(
            'select id, counter from analytics where link_id=? and date=?', 
            [$res[0]->id, $today_date]
        );

        if (count($analytics) == 0) { 
            DB::table('analytics')->insert([
                'link_id' => $res[0]->id,
                'date' => $today_date,
                'counter' => 1
            ]);
        } else {
            DB::table('analytics')
                ->where('id', $analytics[0]->id)
                ->increment('counter');
        }

        return redirect($res[0]->long_url);
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
                    // specifying for short url that not expired yet
                    $url = DB::scalar("select short_url from links where short_url = ? where expired_at > > current_timestamp(0)", [$value]);
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

        // TODO: insert if short_url is not already used
        $id = DB::scalar("select id from links where short_url = ? ", [$value]);
        if (!is_null($id)) {
            // update if short_url is already used
            DB::update('update links set user_id = ?, long_url = ?, expired_at = ? where id = ?', [
                $request->user_id,
                $request->long_url,
                $expiredDate,
                $id,
            ]);

        }
        
        $res = DB::insert('insert into links (user_id, short_url, long_url, expired_at) values (?, ?, ?, ?)', [
            $request->user_id,
            $request->short_url,
            $request->long_url,
            $expiredDate,
        ]);

    }
}
