"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function TopHooksChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(200, data.length * 36)}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
        <XAxis type="number" tick={{ fill: "oklch(0.6 0.005 285)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis
          type="category" dataKey="name" width={200}
          tick={{ fill: "oklch(0.6 0.005 285)", fontSize: 11 }}
          axisLine={false} tickLine={false}
          tickFormatter={(v: string) => v.length > 28 ? v.substring(0, 28) + "…" : v}
        />
        <Tooltip
          contentStyle={{ background: "oklch(0.12 0.005 285)", border: "1px solid oklch(0.22 0.005 285)", borderRadius: 8, color: "#fff", fontSize: 12 }}
          cursor={{ fill: "oklch(0.18 0.005 285)" }}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} name="Ocorrências">
          {data.map((_, i) => <Cell key={i} fill="oklch(0.6 0.2 264)" fillOpacity={0.85} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
