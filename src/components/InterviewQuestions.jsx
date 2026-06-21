import ReactMarkdown from "react-markdown";

function InterviewQuestions({
  resumeText,
  loadingQuestions,
  generateInterviewQuestions,
  interviewQuestions,
}) {
  return (
    <>
      {resumeText && (
        <section className="mb-8">
          <button
            onClick={generateInterviewQuestions}
            disabled={loadingQuestions}
            className="w-full py-4 bg-gradient-to-r from-violet-600/20 to-cyan-600/20 hover:from-violet-600/30 hover:to-cyan-600/30 border border-violet-500/30 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-3"
          >
            {loadingQuestions ? (
              <>
                <svg
                  className="animate-spin w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>

                Generating Questions...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                Generate Interview Questions
              </>
            )}
          </button>
        </section>
      )}

      {interviewQuestions && (
        <section className="mb-8 bg-[#12121a] border border-white/[0.08] rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-white">
              Interview Questions
            </h2>
          </div>

          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown>
              {interviewQuestions}
            </ReactMarkdown>
          </div>
        </section>
      )}
    </>
  );
}

export default InterviewQuestions;