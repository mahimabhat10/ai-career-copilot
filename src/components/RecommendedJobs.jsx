function RecommendedJobs({ recommendedJobs }) {
  if (!recommendedJobs || recommendedJobs.length === 0) {
    return null;
  }

  return (
    <section className="mb-8 bg-[#12121a] border border-white/[0.08] rounded-2xl p-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-violet-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-white">
          Recommended Jobs
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {recommendedJobs.map((job, index) => (
          <div
            key={index}
            className="px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-gray-300 text-sm hover:bg-violet-500/10 hover:border-violet-500/20 transition-all duration-300"
          >
            {job}
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecommendedJobs;