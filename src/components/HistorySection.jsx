function HistorySection({ history, deleteResume, historyRef }) {
  if (!history || history.length === 0) return null;

  return (
    <section
  ref={historyRef}
  className="mb-8 bg-[#12121a] border border-white/[0.08] rounded-2xl p-8"
>
      <h2 className="text-xl font-semibold text-white mb-6">
        Previous Analyses
      </h2>

      <div className="space-y-3">
        {history.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl"
          >
            <div>
              <p className="text-white font-medium">
                {item.recommendedRole}
              </p>

              <p className="text-sm text-gray-500">
                {item.resumeStrength}
              </p>
            </div>

           <div className="flex gap-3">
  {item.resumeUrl && (
    <>
      <a
        href={item.resumeUrl}
        target="_blank"
        rel="noreferrer"
        className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded text-cyan-400"
      >
        View
      </a>

      <a
        href={item.resumeUrl}
        download
        className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded text-emerald-400"
      >
        Download
      </a>
    </>
  )}

  <button
    onClick={() => deleteResume(item._id)}
    className="px-3 py-1 bg-red-500/20 rounded text-red-400"
  >
    Delete
  </button>
</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HistorySection;