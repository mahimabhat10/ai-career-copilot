function ResumeStrength({ resumeStrength, recommendedRole }) {
  if (!resumeStrength && !recommendedRole) return null;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {resumeStrength && (
        <div className="bg-[#12121a] border border-white/[0.08] rounded-2xl p-8">
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
            Resume Strength
          </h3>

          <p className="text-2xl font-bold text-white">
            {resumeStrength}
          </p>
        </div>
      )}

      {recommendedRole && (
        <div className="bg-[#12121a] border border-white/[0.08] rounded-2xl p-8">
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
            Recommended Career Path
          </h3>

          <p className="text-2xl font-bold text-white">
            {recommendedRole}
          </p>
        </div>
      )}
    </section>
  );
}

export default ResumeStrength;