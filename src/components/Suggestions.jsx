function Suggestions({ suggestions }) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <section className="mb-8 bg-[#12121a] border border-white/[0.08] rounded-2xl p-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-amber-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-white">
          Improvement Suggestions
        </h3>
      </div>

      <div className="space-y-3">
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 px-4 py-3 bg-amber-500/5 border border-amber-500/10 rounded-xl"
          >
            <span className="text-amber-400 font-bold text-sm mt-0.5">
              {index + 1}
            </span>

            <p className="text-gray-300 text-sm">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Suggestions;