function JobMatcher({
  jobDescription,
  setJobDescription,
  analyzeJD,
  matchScore,
  matchedSkills,
  missingJDKeywords,
}){
  return (
    <section className="mb-8 bg-[#12121a] border border-white/[0.08] rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Job Description Matcher
          </h2>
          <p className="text-sm text-gray-500">
            Paste a job description to see how well your resume matches
          </p>
        </div>
      </div>

      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the job description here..."
        className="w-full h-40 p-5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500/50 resize-none"
      />

      <button
        onClick={analyzeJD}
        className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-600 to-violet-600 text-white font-semibold rounded-xl"
      >
        Analyze Match
      </button>

      {matchScore !== null && (
        <div className="mt-6 p-6 bg-white/[0.03] border border-white/[0.06] rounded-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl font-bold text-violet-400">
              {matchScore}%
            </div>

            <div>
              <p className="text-white font-medium">Match Score</p>
              <p className="text-gray-500 text-sm">
                {matchScore >= 80
                  ? "Strong match"
                  : matchScore >= 60
                  ? "Moderate match"
                  : "Weak match"}
              </p>
            </div>
          </div>
{matchedSkills?.length > 0 && (
  <>
    <h4 className="text-sm font-medium text-gray-400 mb-3">
      Matched Skills
    </h4>

    <div className="flex flex-wrap gap-2 mb-6">
      {matchedSkills.map((item, index) => (
        <span
          key={index}
          className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-lg"
        >
          {item}
        </span>
      ))}
    </div>
  </>
)}
{matchedSkills?.length > 0 && (
  <>
    <h4 className="text-sm font-medium text-gray-400 mb-3">
      Matched Skills
    </h4>

    <div className="flex flex-wrap gap-2 mb-6">
      {matchedSkills.map((item, index) => (
        <span
          key={index}
          className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-lg"
        >
          {item}
        </span>
      ))}
    </div>
  </>
)}
          {missingJDKeywords?.length > 0 && (
            <>
              <h4 className="text-sm font-medium text-gray-400 mb-3">
                Missing Keywords
              </h4>

              <div className="flex flex-wrap gap-2">
                {missingJDKeywords.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-lg"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}

export default JobMatcher;