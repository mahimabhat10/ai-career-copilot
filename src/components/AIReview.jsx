import ReactMarkdown from "react-markdown";

function AIReview({ aiReview }) {
  if (!aiReview) return null;

  return (
    <section className="mb-8 bg-[#12121a] border border-white/[0.08] rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
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
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            AI Resume Review
          </h2>
          <p className="text-sm text-gray-500">
            Detailed analysis powered by AI
          </p>
        </div>
      </div>

      <div className="prose prose-invert prose-sm max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-xl font-bold text-white mt-6 mb-3">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-lg font-semibold text-white mt-5 mb-2">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-base font-semibold text-gray-200 mt-4 mb-2">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-gray-400 leading-relaxed mb-3">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-5 space-y-1 mb-4 text-gray-400">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-5 space-y-1 mb-4 text-gray-400">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-gray-400">{children}</li>
            ),
            strong: ({ children }) => (
              <strong className="text-white font-semibold">
                {children}
              </strong>
            ),
          }}
        >
          {aiReview}
        </ReactMarkdown>
      </div>
    </section>
  );
}

export default AIReview;