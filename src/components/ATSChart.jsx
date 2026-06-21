import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ATSChart({
  atsScore,
  improvedScore,
  downloadReport,
}) {
  if (atsScore === null) return null;

  const chartData = [
    { name: "Current ATS", score: atsScore || 0 },
    { name: "Potential ATS", score: improvedScore || 0 },
  ];

  return (
    <section className="mb-8 bg-[#12121a] border border-white/[0.08] rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">
          ATS Score Comparison
        </h2>

        <button
          onClick={downloadReport}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 transition-all duration-300"
        >
          Export PDF
        </button>
      </div>

      <div style={{ width: "100%", height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis
              dataKey="name"
              stroke="#4b5563"
              fontSize={12}
            />

            <YAxis
              stroke="#4b5563"
              fontSize={12}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a2e",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="score"
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
            />

            <defs>
              <linearGradient
                id="barGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#8b5cf6"
                />
                <stop
                  offset="100%"
                  stopColor="#06b6d4"
                />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ATSChart;