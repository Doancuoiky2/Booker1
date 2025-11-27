import React from "react";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Tháng 1", sales: 100 },
  { name: "Tháng 2", sales: 300 },
  { name: "Tháng 3", sales: 250 },
  { name: "Tháng 4", sales: 550 },
  { name: "Tháng 5", sales: 300 },
  { name: "Tháng 6", sales: 680 },
  { name: "Tháng 7", sales: 380 },
  { name: "Tháng 8", sales: 450 },
  { name: "Tháng 9", sales: 100 },
];

export default function SalesAreaChart({ status }) {
  return (
    <div style={{ width: "100%", height: 100 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            {status === true ? (
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            ) : (
              <linearGradient id="colorSales2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9ccc66" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#9ccc66" stopOpacity={0.1} />
              </linearGradient>
            )}
          </defs>

          <Tooltip />
          {status === true ? (
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSales)"
            />
          ) : (
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#9ccc66"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSales2)"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
