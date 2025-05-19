<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use DateTime;
use DateInterval;

class LinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $expired_date = date_add(
            new \DateTime(),
            new \DateInterval('P30D')
        )->format('Y-m-d H:i:s');

        DB::table('links')->insert([
            [
                'user_id' => 1,
                'short_url' => 'repo',
                'long_url' => 'https://github.com/egiiputra/nano-url',
                'expired_at' => $expired_date,
            ],
            [
                'user_id' => 1,
                'short_url' => 'github',
                'long_url' => 'https://github.com/egiiputra',
                'expired_at' => $expired_date,
            ],
            [
                'user_id' => 1,
                'short_url' => 'personal',
                'long_url' => 'egiiputra.github.io',
                'expired_at' => $expired_date,
            ],
            [
                'user_id' => 1,
                'short_url' => 'linkedin',
                'long_url' => 'https://www.linkedin.com/in/egi-putra-ragil',
                'expired_at' => $expired_date,
            ],
        ]);
    }
}
