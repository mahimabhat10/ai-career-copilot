import { useState, useRef } from "react";
import Header from "./components/Header";

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

function App() {
  const [history, setHistory] = useState([]);
  const historyRef = useRef(null);
  const resultsRef = useRef(null);
  const fetchHistory = async () => {
  try {
const token = localStorage.getItem("token");

const response = await fetch(
  "http://localhost:5000/my-resumes",
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
  const [jobDescription, setJobDescription] = useState("");
  const [matchScore, setMatchScore] = useState(null);
  const [missingJDKeywords, setMissingJDKeywords] = useState([]);
  const [resumeRating, setResumeRating] = useState("");
  const [aiReview, setAiReview] = useState("");
  const [interviewQuestions, setInterviewQuestions] = useState("");

  const uploadResume = async () => {
    if (!resume) {
      setMessage("Please select a PDF file.");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", resume);
      const response = await fetch("http://localhost:5000/upload-resume", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setMessage(data.message);
      setResumeText(data.extractedText || "");
      if (data.extractedText) {
        const token = localStorage.getItem("token");

const analysisResponse = await fetch(
  "http://localhost:5000/analyze-resume",
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
        const aiResponse = await fetch("http://localhost:5000/ai-review", {
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

  const analyzeJD = () => {
    if (!jobDescription || !resumeText) {
      alert("Please upload a resume and paste a job description.");
      return;
    }
    const jdWords = jobDescription.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
    const uniqueJDWords = [...new Set(jdWords)];
    const matched = uniqueJDWords.filter((w) => resumeText.toLowerCase().includes(w));
    const missing = uniqueJDWords.filter((w) => !resumeText.toLowerCase().includes(w));
    const score = Math.round((matched.length / uniqueJDWords.length) * 100);
    setMatchScore(score);
    setMissingJDKeywords(missing.slice(0, 15));
  };

  const generateInterviewQuestions = async () => {
    try {
      setLoadingQuestions(true);
      const response = await fetch("http://localhost:5000/interview-questions", {
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

  const deleteResume = async (id) => {
    try {
      await fetch(`http://localhost:5000/delete-resume/${id}`, { method: "DELETE" });
      fetchHistory();
    } catch (error) {
      console.error(error);
    }
  };

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

        {/* Upload Section */}
        <UploadSection
  resume={resume}
  loading={loading}
  message={message}
  setResume={setResume}
  uploadResume={uploadResume}
  fetchHistory={fetchHistory}
/>
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
  analyzeJD={analyzeJD}
  matchScore={matchScore}
  missingJDKeywords={missingJDKeywords}
/>
        {/* AI Review */}
       <AIReview aiReview={aiReview} />
        {/* Interview Questions */}
<InterviewQuestions
  resumeText={resumeText}
  loadingQuestions={loadingQuestions}
  generateInterviewQuestions={generateInterviewQuestions}
  interviewQuestions={interviewQuestions}
/>

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
