import { useEffect, useState } from "react";

function Dashboard() {
  const [adminStats, setAdminStats] = useState(null);
  const user = JSON.parse(
  localStorage.getItem("user")
);

 useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:5000/admin/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => setAdminStats(data))
    .catch((err) => console.error(err));
}, []);

  return (
    <div className="min-h-screen bg-[#0f0f15] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        AI Career Copilot Dashboard
      </h1>

 {user?.role === "admin" && adminStats && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#171722] p-6 rounded-2xl border border-white/10">
            <p className="text-gray-400 text-sm">Total Users</p>
            <h2 className="text-4xl font-bold mt-2">
              {adminStats.totalUsers}
            </h2>
          </div>

          <div className="bg-[#171722] p-6 rounded-2xl border border-white/10">
            <p className="text-gray-400 text-sm">Total Resumes</p>
            <h2 className="text-4xl font-bold mt-2">
              {adminStats.totalResumes}
            </h2>
          </div>

          <div className="bg-[#171722] p-6 rounded-2xl border border-white/10">
            <p className="text-gray-400 text-sm">Average ATS Score</p>
            <h2 className="text-4xl font-bold mt-2">
              {adminStats.averageATS}%
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;