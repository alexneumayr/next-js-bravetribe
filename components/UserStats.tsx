'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/shadcn/chart';
import { monthNames } from '@/util/monthNames';
import { DateTime } from 'luxon';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

function calculateTimeRange() {
  const now = DateTime.now();
  const aYearAgo = now.endOf('month').plus({ day: 1 }).minus({ months: 12 });
  const startMonth = monthNames[aYearAgo.month - 1];
  const startYear = aYearAgo.year;
  const endMonth = monthNames[now.month - 1];
  const endYear = now.year;
  return { startMonth, startYear, endMonth, endYear };
}

type Props = {
  chartData: {
    month: string | undefined;
    experiences: number | undefined;
  }[];
};

const chartConfig = {
  experiences: {
    label: 'Experiences',
    color: 'hsl(33, 100%, 50%)',
  },
} satisfies ChartConfig;

export default function UserStats({ chartData }: Props) {
  const timeRange = calculateTimeRange();
  return (
    <Card className="max-w-[400px]">
      <CardHeader>
        <CardTitle>Experience Reports per month</CardTitle>
        <CardDescription>{`${timeRange.startMonth} ${timeRange.startYear} - ${timeRange.endMonth} ${timeRange.endYear} `}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="experiences" fill="hsl(33, 100%, 50%)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
