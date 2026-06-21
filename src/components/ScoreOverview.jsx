function ScoreOverview({
  atsScore,
  improvedScore,
  foundKeywords,
  missingKeywords,
  matchScore,
}) {
  if (atsScore === null) return null;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="lg:col-span-1 bg-[#12121a] border border-white/[0.08] rounded-2xl p-8 flex flex-col items-center justify-center">
        <div className="text-center">
          <h3 className="text-gray-400 mb-2">ATS Score</h3>
          <p className="text-5xl font-bold text-white">{atsScore}</p>
        </div>
      </div>

      <div className="lg:col-span-2 grid grid-cols-2 gap-4">
        <div className="bg-[#12121a] border border-white/[0.08] rounded-2xl p-6">
          <p className="text-gray-400">Skills Found</p>
          <p className="text-3xl font-bold text-white">
            {foundKeywords.length}
          </p>
        </div>

        <div className="bg-[#12121a] border border-white/[0.08] rounded-2xl p-6">
          <p className="text-gray-400">Missing Skills</p>
          <p className="text-3xl font-bold text-white">
            {missingKeywords.length}
          </p>
        </div>

        <div className="bg-[#12121a] border border-white/[0.08] rounded-2xl p-6">
          <p className="text-gray-400">Job Match</p>
          <p className="text-3xl font-bold text-white">
            {matchScore || 0}%
          </p>
        </div>

        <div className="bg-[#12121a] border border-white/[0.08] rounded-2xl p-6">
          <p className="text-gray-400">Potential Score</p>
          <p className="text-3xl font-bold text-white">
            {improvedScore ?? "-"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ScoreOverview;