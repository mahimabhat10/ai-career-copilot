import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://ai-career-copilot-backend-a90g.onrender.com/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f15] text-white p-8">
      <div className="max-w-2xl mx-auto bg-[#171722] border border-white/10 rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        <div className="space-y-4">
          <div>
            <p className="text-gray-400">Name</p>
            <p className="text-xl">{user.name}</p>
          </div>

          <div>
            <p className="text-gray-400">Email</p>
            <p className="text-xl">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-400">Role</p>
            <p className="text-xl capitalize">
              {user.role || "user"}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Account Created</p>
            <p className="text-xl">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;