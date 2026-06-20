"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface BarChartProps {
  data: { date: string; count: number }[];
}

export function BarChartComponent({ data }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="date"
          tick={{ fill: "oklch(0.6 0.005 285)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          interval={2}
        />
        <YAxis
          tick={{ fill: "oklch(0.6 0.005 285)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            background: "oklch(0.12 0.005 285)",
            border: "1px solid oklch(0.22 0.005 285)",
            borderRadius: 8,
            color: "#fff",
            fontSize: 12,
          }}
          cursor={{ fill: "oklch(0.18 0.005 285)" }}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Anúncios">
          {data.map((_, i) => (
            <Cell key={i} fill="oklch(0.6 0.2 264)" fillOpacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
