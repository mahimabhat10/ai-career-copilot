import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminAnalytics({ history }) {
  const chartData = history.map((item, index) => ({
    name: `Resume ${index + 1}`,
    ats: item.atsScore,
  }));

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
      <h2 className="text-2xl font-bold mb-6">
        ATS Analytics
      </h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ats" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdminAnalytics;