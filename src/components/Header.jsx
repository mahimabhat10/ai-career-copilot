function Header() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <header className="text-center mb-16">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-6">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        AI-Powered Career Intelligence
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
  <span className="text-cyan-400 font-medium">
    {user?.name}
  </span>
</div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30"
        >
          Logout
        </button>
      </div>

      <h1 className="text-7xl font-bold tracking-tight mb-4">
        <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          Career
        </span>
        <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          {" "}Copilot
        </span>
      </h1>

      <p className="text-gray-500 text-lg max-w-xl mx-auto">
        Upload your resume and get instant AI-powered analysis,
        scoring, and personalized career recommendations.
      </p>
    </header>
  );
}

export default Header;