import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ATSTrendChart({ history }) {
  const data = history.map((item, index) => ({
    resume: index + 1,
    score: item.atsScore,
  }));

  return (
    <div className="bg-[#12121a] border border-white/[0.08] rounded-2xl p-8 mb-8">
      <h2 className="text-xl font-semibold text-white mb-6">
        ATS Progress Trend
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="resume" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#8b5cf6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ATSTrendChart;