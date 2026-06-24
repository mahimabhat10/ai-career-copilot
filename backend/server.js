require("dotenv").config();
console.log("Cloudinary Key:", process.env.CLOUDINARY_API_KEY);
const express = require("express");
const verifyToken = require("./middleware/authMiddleware");
const cors = require("cors");
const multer = require("multer");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cloudinary = require("./cloudinary");
const pdfParse = require("pdf-parse");
const fs = require("fs");

const User = require("./models/User");

const connectDB = require("./db");
connectDB();
const Groq = require("groq-sdk");
const adminRoutes = require("./routes/adminRoutes");
const Resume = require("./models/Resume");
const jwt = require("jsonwebtoken");
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.json({
    message: "AI Career Copilot Backend Running 🚀",
  });
});

app.use("/admin", adminRoutes);
app.post("/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    console.log("UPLOAD REQUEST RECEIVED");
    const cloudinaryResult =
  await cloudinary.uploader.upload(
    req.file.path,
    {
      resource_type: "raw",
      folder: "career-copilot-resumes",
    }
  );

console.log(cloudinaryResult.secure_url);

    const pdfBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(pdfBuffer);

    res.json({
      success: true,
      message: "Resume uploaded and parsed successfully",
      extractedText: pdfData.text,
    });
  } catch (error) {
    console.error("PDF ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error reading PDF",
    });
  }
});

app.post(
  "/analyze-resume",
  verifyToken,
  async (req, res) => {
  console.log("ANALYZE ROUTE HIT");
  const { resumeText } = req.body;

  const keywords = [
    "javascript",
    "react",
    "node",
    "express",
    "mongodb",
    "sql",
    "python",
    "java",
    "aws",
  ];

  let score = 50;

  const foundKeywords = [];
  const missingKeywords = [];
  const suggestions = [];

  keywords.forEach((keyword) => {
    if (
      resumeText &&
      resumeText.toLowerCase().includes(keyword)
    ) {
      foundKeywords.push(keyword);
      score += 5;
    } else {
      missingKeywords.push(keyword);
    }
  });

  if (score > 100) score = 100;

  if (missingKeywords.length > 0) {
    suggestions.push(
      `Add these important skills: ${missingKeywords.join(", ")}`
    );
  }

  if (
    resumeText &&
    !resumeText.toLowerCase().includes("project")
  ) {
    suggestions.push(
      "Add a Projects section to showcase practical experience."
    );
  }

  if (
    resumeText &&
    !resumeText.toLowerCase().includes("skill")
  ) {
    suggestions.push(
      "Add a dedicated Skills section."
    );
  }

  if (
    resumeText &&
    !resumeText.toLowerCase().includes("education")
  ) {
    suggestions.push(
      "Add an Education section."
    );
  }
  console.log("SUGGESTIONS:", suggestions);
  let recommendedRole = "General Software Developer";

if (
  foundKeywords.includes("react") &&
  foundKeywords.includes("javascript")
) {
  recommendedRole = "Frontend Developer";
}

if (
  foundKeywords.includes("node") &&
  foundKeywords.includes("mongodb")
) {
  recommendedRole = "Backend Developer";
}

if (
  foundKeywords.includes("python")
) {
  recommendedRole = "Python Developer";
}

 
let recommendedJobs = [];

if (recommendedRole === "Frontend Developer") {
  recommendedJobs = [
    "React Developer",
    "Frontend Engineer",
    "UI Developer",
    "JavaScript Developer",
  ];
}

if (recommendedRole === "Backend Developer") {
  recommendedJobs = [
    "Node.js Developer",
    "Backend Engineer",
    "API Developer",
    "Express.js Developer",
  ];
}

if (recommendedRole === "Python Developer") {
  recommendedJobs = [
    "Python Developer",
    "Django Developer",
    "Automation Engineer",
    "Data Analyst",
  ];
}

if (recommendedRole === "General Software Developer") {
  recommendedJobs = [
    "Software Developer",
    "Junior Programmer",
    "Software Engineer",
    "Application Developer",
  ];
}
let resumeStrength = "";

if (score >= 80) {
  resumeStrength = "Strong";
} else if (score >= 60) {
  resumeStrength = "Average";
} else {
  resumeStrength = "Needs Improvement";
}
// 
let roadmap = [];

if (recommendedRole === "Frontend Developer") {
  roadmap = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Redux",
    "Git",
    "Deployment",
  ];
}

if (recommendedRole === "Backend Developer") {
  roadmap = [
    "Node.js",
    "Express.js",
    "MongoDB",
    "REST APIs",
    "Authentication",
    "Git",
    "Deployment",
  ];
}

if (recommendedRole === "Python Developer") {
  roadmap = [
    "Python",
    "OOP",
    "Django",
    "Flask",
    "SQL",
    "APIs",
    "Deployment",
  ];
}

if (recommendedRole === "General Software Developer") {
  roadmap = [
    "C/C++",
    "DSA",
    "OOP",
    "DBMS",
    "SQL",
    "Git",
    "Projects",
  ];
}

const improvedScore = Math.min(
  100,
  score + missingKeywords.length * 3
);
console.log("ATS:", score);
console.log("Improved:", improvedScore);
let resumeRating = "";

if (score >= 90) {
  resumeRating = "Excellent";
} else if (score >= 75) {
  resumeRating = "Very Good";
} else if (score >= 60) {
  resumeRating = "Good";
} else if (score >= 40) {
  resumeRating = "Average";
} else {
  resumeRating = "Poor";
}
console.log("ATS SCORE:", score);
console.log("MISSING:", missingKeywords.length);
console.log("IMPROVED:", improvedScore);
console.log("SAVING TO DB...");

try {
 const savedResume = await Resume.create({
  userId: req.user.id,
  atsScore: score,
  recommendedRole,
  resumeStrength,
  resumeText,
});
  console.log("SAVED TO DB ✅");
  console.log(savedResume);
} catch (err) {
  console.error("DB SAVE ERROR ❌");
  console.error(err);
}

res.json({
  success: true,
  message: "Resume uploaded and parsed successfully",
  atsScore: score,
  improvedScore,
  foundKeywords,
  missingKeywords,
  suggestions,
  resumeRating,
  recommendedRole,
  recommendedJobs,
  roadmap,
  resumeStrength,
});
});
app.post("/job-match", async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  const resumeWords =
    resumeText.toLowerCase().split(/\W+/);

  const jobWords =
    jobDescription.toLowerCase().split(/\W+/);

  const matched = [];

  jobWords.forEach((word) => {
    if (
      word.length > 3 &&
      resumeWords.includes(word)
    ) {
      matched.push(word);
    }
  });

  const uniqueMatched = [...new Set(matched)];

  const score = Math.min(
    100,
    Math.round(
      (uniqueMatched.length / jobWords.length) * 1000
    )
  );

  const missingSkills = jobWords.filter(
    (word) =>
      word.length > 3 &&
      !resumeWords.includes(word)
  );

  res.json({
    score,
    matchedSkills: uniqueMatched,
    missingSkills: [...new Set(missingSkills)],
  });
});

// res.json({
//   success: true,
//   atsScore: score,
//   foundKeywords : [],
//   missingKeywords,
//   suggestions,
//   recommendedRole  "General Software Developer"
// });
// });
app.post("/generate-cover-letter", async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    const prompt = `
You are a professional career coach.

Using the resume and job description below,
write a personalized cover letter.

Resume:
${resumeText}

Job Description:
${jobDescription}

Requirements:
- Professional tone
- 250-350 words
- Highlight matching skills
- Show enthusiasm
- End professionally
`;

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    res.json({
      success: true,
      coverLetter:
        completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Cover Letter Generation Failed",
    });
  }
});

app.post("/rewrite-resume", async (req, res) => {
  try {
    const { resumeText } = req.body;

    const prompt = `
Rewrite this resume to make it:

- More ATS friendly
- More professional
- Achievement oriented
- Stronger action verbs
- Better software developer resume

Resume:

${resumeText}
`;

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    res.json({
      success: true,
      improvedResume:
        completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Resume Rewrite Failed",
    });
  }
});

const PORT = 5000;
app.post("/ai-review", async (req, res) => {
  try {
    const { resumeText } = req.body;

  const prompt = `
You are an expert ATS Resume Reviewer.

Analyze this resume:

${resumeText}

Return the response in a professional format.

# ATS Score

# Strengths

# Weaknesses

# Missing Skills

# Improvement Suggestions

# Recommended Career Role

# ATS Optimized Resume Summary

Give detailed feedback and actionable suggestions.
`;
const completion =
  await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

const review =
  completion.choices[0].message.content;

res.json({
  success: true,
  review,
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "AI Review Failed",
    });
  }
});
app.post("/interview-questions", async (req, res) => {
  try {
    const { resumeText } = req.body;

    const prompt = `
Generate 10 interview questions and answers based on this resume.

Resume:
${resumeText}

Format:

Q1:
Answer:

Q2:
Answer:
`;

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    res.json({
      success: true,
      questions:
        completion.choices[0].message.content,
    });
  } catch (error) {
  console.error("INTERVIEW ERROR:");
  console.error(error.message);
  console.error(error);

  res.status(500).json({
    success: false,
    questions: error.message,
  });
}
});
app.get("/all-resumes", async (req, res) => {
  try {
    const resumes = await Resume.find().sort({
      createdAt: -1,
    });

    res.json(resumes);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch resumes",
    });
  }
});
app.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password"
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});
app.get(
  "/my-resumes",
  verifyToken,
  async (req, res) => {
    try {
      const resumes = await Resume.find({
        userId: req.user.id,
      }).sort({
        createdAt: -1,
      });

      res.json(resumes);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);
app.delete("/delete-resume/:id", async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Resume deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
});
const bcrypt = require("bcryptjs");

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await user.save();

    res.status(201).json({
      message: "Signup successful",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
          role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});



app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.listen(PORT, () => {
  console.log("MAHIMA PDF PARSER SERVER RUNNING 🚀");
});
console.log("AI REVIEW ROUTE REGISTERED");
