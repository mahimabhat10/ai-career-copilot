function SkillsSection({ foundKeywords, missingKeywords }) {
  if (
    (!foundKeywords || foundKeywords.length === 0) &&
    (!missingKeywords || missingKeywords.length === 0)
  ) {
    return null;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {foundKeywords.length > 0 && (
        <div className="bg-[#12121a] border border-white/[0.08] rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-white">
              Skills Found
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {foundKeywords.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-lg font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {missingKeywords.length > 0 && (
        <div className="bg-[#12121a] border border-white/[0.08] rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-rose-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01"
                />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-white">
              Missing Skills
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-lg font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default SkillsSection;