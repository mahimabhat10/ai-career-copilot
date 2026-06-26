import { useState, useRef } from "react";
import Header from "./components/Header";
import ATSTrendChart from "./components/ATSTrendChart";
import { useDispatch } from "react-redux";
import {
  useGetMyResumesQuery,
} from "./redux/apiSlice";
import { setResumeData } from "./redux/resumeSlice";
import CoverLetterGenerator from "./components/CoverLetterGenerator";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import UploadSection from "./components/UploadSection";
import ScoreOverview from "./components/ScoreOverview";
import ResumeStrength from "./components/ResumeStrength";

import ATSChart from "./components/ATSChart";
import SkillsSection from "./components/SkillsSection";
import RecommendedJobs from "./components/RecommendedJobs";
import Suggestions from "./components/Suggestions";
import LearningRoadmap from "./components/LearningRoadmap";
import AIReview from "./components/AIReview";
import InterviewQuestions from "./components/InterviewQuestions";
import HistorySection from "./components/HistorySection";
import ResumeText from "./components/ResumeText";
import JobMatcher from "./components/JobMatcher";
import ResumeSummary from "./components/ResumeSummary";
import ResumeRewriter from "./components/ResumeRewriter";
function App() {
useGetMyResumesQuery();
  const dispatch = useDispatch();
  const [coverLetter, setCoverLetter] = useState();
  const [improvedResume, setImprovedResume] = useState("");
const [loadingCoverLetter, setLoadingCoverLetter] = useState(false);
  const [history, setHistory] = useState([]);
  const historyRef = useRef(null);
  const resultsRef = useRef(null);
  const [jobDescription, setJobDescription] = useState("");
const [jobMatchScore, setJobMatchScore] = useState(0);
const [matchedSkills, setMatchedSkills] = useState([]);
const [missingSkills, setMissingSkills] = useState([]);
const analyzeJobMatch = async () => {
  try {
    const response = await fetch(
      "https://ai-career-copilot-backend-a90g.onrender.com/job-match",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      }
    );

    const data = await response.json();

    setJobMatchScore(data.score);
    setMatchedSkills(data.matchedSkills);
    setMissingSkills(data.missingSkills);
  } catch (error) {
    console.error(error);
  }
};
  const fetchHistory = async () => {
  try {
const token = localStorage.getItem("token");

const response = await fetch(
  "https://ai-career-copilot-backend-a90g.onrender.com/my-resumes",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
    const data = await response.json();
    setHistory(data);

    setTimeout(() => {
      historyRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 300);

    setMessage("History loaded successfully. Scroll down to view.");
  } catch (error) {
    console.error(error);
  }
};

  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [atsScore, setAtsScore] = useState(null);
  const [resumeStrength, setResumeStrength] = useState("");
  const [foundKeywords, setFoundKeywords] = useState([]);
  const [missingKeywords, setMissingKeywords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [recommendedRole, setRecommendedRole] = useState("");
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const [improvedScore, setImprovedScore] = useState(null);

  const [matchScore, setMatchScore] = useState(null);
  const [missingJDKeywords, setMissingJDKeywords] = useState([]);
  const [resumeRating, setResumeRating] = useState("");
  const [aiReview, setAiReview] = useState("");
  const [interviewQuestions, setInterviewQuestions] = useState("");
 const rewriteResume = async () => {
  try {
    const response = await fetch(
      "https://ai-career-copilot-backend-a90g.onrender.com/ai-review",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
        }),
      }
    );

    const data = await response.json();

    setImprovedResume(
      data.improvedResume || ""
    );
  } catch (error) {
    console.error(error);
  }
};
  const uploadResume = async () => {
    if (!resume) {
      setMessage("Please select a PDF file.");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", resume);
      const response = await fetch(
     "https://ai-career-copilot-backend-a90g.onrender.com/upload-resume", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setMessage(data.message);
      setResumeText(data.extractedText || "");
      if (data.extractedText) {
        const token = localStorage.getItem("token");

const analysisResponse = await fetch(
  "https://ai-career-copilot-backend-a90g.onrender.com/analyze-resume", 
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      resumeText: data.extractedText,
    }),
  }
);
        const analysisData = await analysisResponse.json();
        const aiResponse = await fetch("https://ai-career-copilot-backend-a90g.onrender.com/ai-review", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeText: data.extractedText }),
        });
        setImprovedScore(analysisData.improvedScore || 0);
        setAtsScore(analysisData.atsScore || 0);
        setResumeStrength(analysisData.resumeStrength || "");
        setFoundKeywords(analysisData.foundKeywords || []);
        setMissingKeywords(analysisData.missingKeywords || []);
        setSuggestions(analysisData.suggestions || []);
        setRecommendedRole(analysisData.recommendedRole || "");
        setRecommendedJobs(analysisData.recommendedJobs || []);
        setResumeRating(analysisData.resumeRating || "");
        const aiData = await aiResponse.json();
        setAiReview(aiData.review || "");
        dispatch(
  setResumeData({
    resumeText: data.extractedText,
    atsScore: analysisData.atsScore,
    aiReview: aiData.review,
  })
);
        setTimeout(() => {
  resultsRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, 300);
      }
    } catch (error) {
      console.error(error);
      setAiReview("AI review temporarily unavailable. Please try again later.");
      
    }finally {
    setLoading(false);
  }
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("AI Career Copilot Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`ATS Score: ${atsScore}/100`, 20, 40);
    doc.text(`Resume Strength: ${resumeStrength}`, 20, 50);
    doc.text(`Career Path: ${recommendedRole}`, 20, 60);
    doc.text("Recommended Jobs:", 20, 80);
    recommendedJobs.forEach((job, index) => {
      doc.text(`- ${job}`, 25, 90 + index * 10);
    });
    let y = 140;
    doc.text("Learning Roadmap:", 20, y);
    roadmap.forEach((item, index) => {
      doc.text(`- ${item}`, 25, y + 10 + index * 10);
    });
    doc.save("Career_Report.pdf");
  };



  const generateInterviewQuestions = async () => {
    try {
      setLoadingQuestions(true);
      const response = await fetch("https://ai-career-copilot-backend-a90g.onrender.com/interview-questions",  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      });
      const data = await response.json();
      setInterviewQuestions(data.questions || "");
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const generateCoverLetter = async () => {
  try {
    setLoadingCoverLetter(true);

    const response = await fetch(
      "https://ai-career-copilot-backend-a90g.onrender.com/generate-cover-letter",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      }
    );

    const data = await response.json();

    setCoverLetter(data.coverLetter || "");
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingCoverLetter(false);
  }
};

const deleteResume = async (id) => {
  try {
    await fetch(
      `https://ai-career-copilot-backend-a90g.onrender.com/delete-resume/${id}`,
      { method: "DELETE" }
    );

    fetchHistory();
  } catch (error) {
    console.error(error);
  }
};
const bestATS =
  history.length > 0
    ? Math.max(...history.map((r) => r.atsScore))
    : 0;

const avgATS =
  history.length > 0
    ? Math.round(
        history.reduce(
          (sum, r) => sum + r.atsScore,
          0
        ) / history.length
      )
    : 0;
  const chartData = [
    { name: "Current ATS", score: atsScore || 0 },
    { name: "Potential ATS", score: improvedScore || 0 },
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return "from-emerald-400 to-cyan-400";
    if (score >= 60) return "from-amber-400 to-orange-400";
    return "from-rose-400 to-pink-400";
  };

  const getScoreRing = (score) => {
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (score / 100) * circumference;
    return { circumference, offset };
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

     <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
 {/* Header */}
<Header />

<ResumeSummary />

<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="grid md:grid-cols-3 gap-4 mb-8"
>
  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
    <h3 className="text-gray-400">Total Resumes</h3>
    <p className="text-3xl font-bold text-white">
      {history.length}
    </p>
  </div>

  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
    <h3 className="text-gray-400">Best ATS</h3>
    <p className="text-3xl font-bold text-emerald-400">
      {bestATS}
    </p>
  </div>

  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
    <h3 className="text-gray-400">Average ATS</h3>
    <p className="text-3xl font-bold text-cyan-400">
      {avgATS}
    </p>
  </div>
</motion.div>

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3 }}
>
  <UploadSection
    resume={resume}
    loading={loading}
    message={message}
    setResume={setResume}
    uploadResume={uploadResume}
    fetchHistory={fetchHistory}
  />
</motion.div>

{/* Score Overview */}
<div ref={resultsRef}>
        <ScoreOverview
  atsScore={atsScore}
  improvedScore={improvedScore}
  foundKeywords={foundKeywords}
  missingKeywords={missingKeywords}
  matchScore={matchScore}
  />
</div>

        {/* Resume Strength & Career Path */}
        <ResumeStrength
  resumeStrength={resumeStrength}
  recommendedRole={recommendedRole}
/>
        {/* ATS Comparison Chart */}
        <ATSChart
  atsScore={atsScore}
  improvedScore={improvedScore}
  downloadReport={downloadReport}
/>
        {/* Skills Section */}
<SkillsSection
  foundKeywords={foundKeywords}
  missingKeywords={missingKeywords}
/>

        {/* Recommended Jobs */}
        <RecommendedJobs
  recommendedJobs={recommendedJobs}
/>
        {/* Suggestions */}
        <Suggestions
  suggestions={suggestions}
/>

        {/* Learning Roadmap */}
        <LearningRoadmap roadmap={roadmap} />
        {/* Job Description Matcher */}
      <JobMatcher
  jobDescription={jobDescription}
  setJobDescription={setJobDescription}
  analyzeJD={analyzeJobMatch}
  matchScore={jobMatchScore}
  matchedSkills={matchedSkills}
  missingJDKeywords={missingSkills}
/>
<CoverLetterGenerator
  generateCoverLetter={generateCoverLetter}
  loadingCoverLetter={loadingCoverLetter}
  coverLetter={coverLetter}
/>
        {/* AI Review */}
       <AIReview aiReview={aiReview} />
        {/* Interview Questions */}
        <ResumeRewriter
  rewriteResume={rewriteResume}
  improvedResume={improvedResume}
/>
<InterviewQuestions
  resumeText={resumeText}
  loadingQuestions={loadingQuestions}
  generateInterviewQuestions={generateInterviewQuestions}
  interviewQuestions={interviewQuestions}
/>
{history.length > 0 && (
  <ATSTrendChart history={history} />
)}
        {/* History */}
        <HistorySection
  history={history}
  deleteResume={deleteResume}
   historyRef={historyRef}
/>

        {/* Extracted Resume Text */}
       <ResumeText resumeText={resumeText} />
        {/* Footer */}
        <footer className="text-center py-8 text-gray-600 text-sm">
          <p>AI Career Copilot </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
