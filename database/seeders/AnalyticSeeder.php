<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AnalyticSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $createdDate = date_sub(
            new \DateTime(),
            new \DateInterval('P30D')
        );

        $analyticDates = [];
        for ($i = 0; $i < 30; $i++) {
            $analyticDates[] = date_add($createdDate, new \DateInterval("P1D"))->format('Y-m-d');
        }

        $data = [];
        for ($i = 1; $i <= 4; $i++) {
            foreach ($analyticDates as $date) {
                $data[] = [
                    'link_id' => $i,
                    'date' => $date,
                    'counter' => rand(1, 100),
                ];
            }
        }
        DB::table('analytics')->insert($data);
    }
}
