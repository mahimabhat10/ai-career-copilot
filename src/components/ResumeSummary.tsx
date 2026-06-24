import { useSelector } from "react-redux";

interface ResumeState {
  resume: {
    atsScore: number;
    aiReview: string;
  };
}

function ResumeSummary() {
  const { atsScore, aiReview } = useSelector(
    (state: ResumeState) => state.resume
  );

  if (!atsScore) return null;

  return (
    <div>
      <p>ATS Score: {atsScore}</p>
      <p>Review Length: {aiReview.length}</p>
    </div>
  );
}

export default ResumeSummary;