function UploadSection({
  resume,
  loading,
  message,
  setResume,
  uploadResume,
  fetchHistory,
}) {
  return (
    <section className="mb-8">
      <div className="group relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/50 to-cyan-600/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

        <div className="relative bg-[#12121a] border border-white/[0.08] rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-semibold text-white">
              Upload Resume
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label className="flex-1 w-full">
              <div className="border-2 border-dashed border-white/10 hover:border-violet-500/50 rounded-xl p-6 text-center cursor-pointer">
                {resume ? (
                  <span className="text-emerald-400">
                    {resume.name}
                  </span>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Drop your PDF here or click to browse
                  </p>
                )}

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="hidden"
                />
              </div>
            </label>

            <div className="flex gap-3">
              <button
                onClick={uploadResume}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl"
              >
                {loading ? "Analyzing..." : "Analyze Resume"}
              </button>

              <button
                onClick={fetchHistory}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl"
              >
                History
              </button>
            </div>
          </div>

          {message && (
            <div className="mt-4 p-4 rounded-xl bg-violet-500/10">
              {message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default UploadSection;