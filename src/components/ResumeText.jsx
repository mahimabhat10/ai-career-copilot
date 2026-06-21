function ResumeText({ resumeText }) {
  if (!resumeText) return null;

  return (
    <section className="mb-8 bg-[#12121a] border border-white/[0.08] rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        <h2 className="text-xl font-semibold text-white">
          Extracted Resume Text
        </h2>
      </div>

      <pre className="whitespace-pre-wrap text-sm text-gray-400 bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 font-mono leading-relaxed">
        {resumeText}
      </pre>
    </section>
  );
}

export default ResumeText;