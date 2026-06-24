function CoverLetterGenerator({
  generateCoverLetter,
  loadingCoverLetter,
  coverLetter,
}) {
  return (
    <section className="mb-8 bg-[#12121a] border border-white/[0.08] rounded-2xl p-8">
      <h2 className="text-xl font-semibold text-white mb-4">
        AI Cover Letter Generator
      </h2>

      <button
        onClick={generateCoverLetter}
        disabled={loadingCoverLetter}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold"
      >
        {loadingCoverLetter
          ? "Generating..."
          : "Generate Cover Letter"}
      </button>

      {coverLetter && (
        <div className="mt-6">
          <textarea
            value={coverLetter}
            readOnly
            className="w-full h-80 p-4 bg-black/20 border border-white/10 rounded-xl text-gray-300"
          />
        </div>
      )}
    </section>
  );
}

export default CoverLetterGenerator;