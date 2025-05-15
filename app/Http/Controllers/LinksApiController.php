<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class LinksApiController extends Controller
{
    public function count()
    {
        return response()->json([
            'data' => DB::scalar("select count(id) from links where user_id=?", [auth()->id()])
        ]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = $request->input('page') ?? 1;
        $pageSize = $request->input('pageSize') ?? 10;

        $data = DB::select(
            "select short_url, long_url, expired_at from links where user_id=? limit ? offset ?",
            [auth()->id(), $pageSize, ($page-1) * $pageSize]
        );
        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
