import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data1 = [
  { name: "Jan", value: 0 },
  { name: "Feb", value: 20 },
  { name: "Mar", value: 50 },
  { name: "Apr", value: 80 },
  { name: "Apr", value: 50 },
  { name: "Apr", value: 100 },
  { name: "Apr", value: 120 },
  { name: "Apr", value: 145 },
  { name: "Apr", value: 100 },
];

const data2 = [
  { name: "Jan", value: 0 },
  { name: "Feb", value: 5 },
  { name: "Mar", value: 10 },
  { name: "Apr", value: 12 },
  { name: "Apr", value: 9 },
  { name: "Apr", value: 5 },
  { name: "Apr", value: 7 },
  { name: "Apr", value: 8 },
  { name: "Apr", value: 12 },
];

export default function SimpleLineChart({ status }) {
  return (
    <div style={{ width: "100%", height: 105 }}>
      <ResponsiveContainer>
        <LineChart data={status ? data1 : data2}>
          <defs>
            <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={status ? "#9ccc66" : "#4680fe"}
                stopOpacity={0.5}
              />
              <stop
                offset="95%"
                stopColor={status ? "#9ccc66" : "#4680fe"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Tooltip />

          <Line
            type="linear"
            dataKey="value"
            stroke={status ? "#9ccc66" : "#4680fe"}
            strokeWidth={3}
            dot={{ r: 4, fill: status ? "#9ccc66" : "#4680fe", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
            fillOpacity={1}
            fill="url(#colorLine)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
