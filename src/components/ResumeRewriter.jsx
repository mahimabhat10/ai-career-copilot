function ResumeRewriter({
  rewriteResume,
  improvedResume,
}) {
  return (
    <section className="mb-8 bg-[#12121a] border border-white/[0.08] rounded-2xl p-8">
      <h2 className="text-xl font-semibold text-white mb-4">
        AI Resume Rewriter
      </h2>

      <button
        onClick={rewriteResume}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold"
      >
        Improve Resume
      </button>

      {improvedResume && (
        <textarea
          readOnly
          value={improvedResume}
          className="w-full h-96 mt-6 p-4 bg-black/20 border border-white/10 rounded-xl text-gray-300"
        />
      )}
    </section>
  );
}

export default ResumeRewriter;