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

            <button
              onClick={() => deleteResume(item._id)}
              className="px-3 py-1 bg-red-500/20 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HistorySection;