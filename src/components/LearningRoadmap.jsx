function LearningRoadmap({ roadmap }) {
  if (!roadmap || roadmap.length === 0) {
    return null;
  }

  return (
    <section className="mb-8 bg-[#12121a] border border-white/[0.08] rounded-2xl p-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-white">
          Learning Roadmap
        </h3>
      </div>

      <div className="space-y-3">
        {roadmap.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-4 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {index + 1}
            </div>

            <p className="text-gray-300 text-sm">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LearningRoadmap;