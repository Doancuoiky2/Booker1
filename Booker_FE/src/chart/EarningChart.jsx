import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Tháng 1", earn: 100 },
  { name: "Tháng 2", earn: 300 },
  { name: "Tháng 3", earn: 250 },
  { name: "Tháng 4", earn: 550 },
  { name: "Tháng 5", earn: 300 },
  { name: "Tháng 6", earn: 680 },
  { name: "Tháng 7", earn: 380 },
  { name: "Tháng 8", earn: 450 },
  { name: "Tháng 9", earn: 100 },
];

export default function EarningChart() {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <text
            x="50%"
            y={30}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: 18, fontWeight: 600, fill: "#616161ff" }}
          >
            Doanh thu cửa hàng theo tháng
          </text>
          <defs>
            <linearGradient id="colorEarn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffb957" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#ffb957" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 14, fontWeight: 600, fill: "#555" }}
          />
          <YAxis tick={{ fontSize: 14, fontWeight: 600, fill: "#555" }} />

          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="earn"
            stroke="#ffb957"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorEarn)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
