import Header from '@/components/header';
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  views: {
    label: "Short link visitor",
  },
  counter: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

function Chart() {
  const short_url = window.location.pathname.split('/').at(-2)
  const [chartData, setChartData] = useState<{date: string, counter: number}[]>([])

  const total = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.counter, 0), [chartData]
  )

  useEffect(() => {
    fetch(`/api/links/${short_url}/analytic`)
      .then((res) => res.json())
      .then((data) => {
        setChartData(data)
      })
    console.log(total)
  }, [])
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>/{short_url} visitor</CardTitle>
          <CardDescription>
            Showing total visitors since short url created
          </CardDescription>
        </div>
        <div className="flex">
          <div
            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
          >
            <span className="text-xs text-muted-foreground">
              Visitor
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey='counter' fill="hsl(var(--chart-1))" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default function Analytic() {

    const { auth } = usePage<SharedData>().props;
    return (
        <>
        <Head title="Analytic"/>
        <Header auth={auth}/>
        <div className="flex flex-col items-center justify-center bg-sidebar py-10">
            <div className="w-full bg-white lg:w-8/10 shadow-lg rounded-xl p-10">
              <Chart/>
            </div>
        </div>
        </>
    )
}

