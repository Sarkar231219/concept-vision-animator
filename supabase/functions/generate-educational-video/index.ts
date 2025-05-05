
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Sample list of educational video URLs by category for demonstration
const videoLibrary = {
  elementary: {
    science: [
      "https://player.vimeo.com/video/562237744", // Plants
      "https://player.vimeo.com/video/248066718", // Solar System
      "https://player.vimeo.com/video/219643392", // Water Cycle
    ],
    math: [
      "https://player.vimeo.com/video/98790810", // Addition
      "https://player.vimeo.com/video/237371036", // Multiplication
      "https://player.vimeo.com/video/54598147", // Fractions
    ],
    english: [
      "https://player.vimeo.com/video/194925200", // Alphabet
      "https://player.vimeo.com/video/185687754", // Phonics
      "https://player.vimeo.com/video/155506386", // Reading
    ]
  },
  middle: {
    science: [
      "https://player.vimeo.com/video/171924917", // Cells
      "https://player.vimeo.com/video/137920644", // Atoms
      "https://player.vimeo.com/video/133620428", // Ecosystems
    ],
    math: [
      "https://player.vimeo.com/video/230261243", // Algebra
      "https://player.vimeo.com/video/88250499", // Geometry
      "https://player.vimeo.com/video/235760689", // Ratios
    ],
    coding: [
      "https://player.vimeo.com/video/382005258", // Programming Basics
      "https://player.vimeo.com/video/250221485", // Algorithms
      "https://player.vimeo.com/video/251358662", // Web Development
    ]
  },
  high: {
    science: [
      "https://player.vimeo.com/video/217834643", // Physics
      "https://player.vimeo.com/video/159617705", // Chemistry
      "https://player.vimeo.com/video/87936931", // Biology
    ],
    math: [
      "https://player.vimeo.com/video/208217742", // Calculus
      "https://player.vimeo.com/video/188416798", // Statistics
      "https://player.vimeo.com/video/228955915", // Trigonometry
    ],
    history: [
      "https://player.vimeo.com/video/159873750", // World History
      "https://player.vimeo.com/video/151271165", // Ancient Civilizations
      "https://player.vimeo.com/video/145881489", // Modern History
    ]
  },
  college: {
    science: [
      "https://player.vimeo.com/video/253651230", // Advanced Physics
      "https://player.vimeo.com/video/243966429", // Quantum Mechanics
      "https://player.vimeo.com/video/740639158", // Genetics
    ],
    computer: [
      "https://player.vimeo.com/video/763228765", // Machine Learning
      "https://player.vimeo.com/video/602379994", // Cybersecurity
      "https://player.vimeo.com/video/616382244", // AI
    ],
    business: [
      "https://player.vimeo.com/video/369783288", // Economics
      "https://player.vimeo.com/video/332273837", // Marketing
      "https://player.vimeo.com/video/359490794", // Finance
    ]
  },
  adult: {
    professional: [
      "https://player.vimeo.com/video/497957400", // Leadership
      "https://player.vimeo.com/video/488055461", // Communication
      "https://player.vimeo.com/video/470184675", // Project Management
    ],
    health: [
      "https://player.vimeo.com/video/354697675", // Nutrition
      "https://player.vimeo.com/video/435127897", // Exercise
      "https://player.vimeo.com/video/401463904", // Mental Health
    ],
    technology: [
      "https://player.vimeo.com/video/726385493", // New Tech Trends
      "https://player.vimeo.com/video/578920599", // Digital Literacy
      "https://player.vimeo.com/video/541954891", // Blockchain
    ]
  }
};

// Get keywords from text to determine category
const extractKeywords = (text: string): string => {
  const scienceKeywords = ["science", "biology", "chemistry", "physics", "nature", "animal", "plant", "cell", "atom", "energy", "earth", "space", "planet"];
  const mathKeywords = ["math", "algebra", "geometry", "calculus", "number", "equation", "statistic", "probability", "formula", "theorem"];
  const englishKeywords = ["english", "language", "grammar", "vocabulary", "writing", "reading", "literature", "alphabet", "word"];
  const codingKeywords = ["code", "programming", "algorithm", "computer", "software", "development", "web", "app", "javascript", "python"];
  const historyKeywords = ["history", "ancient", "modern", "war", "civilization", "revolution", "period", "century", "era"];
  const businessKeywords = ["business", "economics", "finance", "market", "company", "strategy", "management", "entrepreneur", "investment"];
  const professionalKeywords = ["professional", "career", "leadership", "communication", "project", "management", "team", "skill", "workplace"];
  const healthKeywords = ["health", "fitness", "nutrition", "exercise", "diet", "mental", "wellness", "lifestyle", "medical"];
  const technologyKeywords = ["technology", "digital", "device", "innovation", "internet", "mobile", "future", "smart", "blockchain", "ai", "artificial intelligence"];

  const lowerText = text.toLowerCase();
  
  if (scienceKeywords.some(keyword => lowerText.includes(keyword))) return "science";
  if (mathKeywords.some(keyword => lowerText.includes(keyword))) return "math";
  if (englishKeywords.some(keyword => lowerText.includes(keyword))) return "english";
  if (codingKeywords.some(keyword => lowerText.includes(keyword))) return "coding";
  if (historyKeywords.some(keyword => lowerText.includes(keyword))) return "history";
  if (businessKeywords.some(keyword => lowerText.includes(keyword))) return "business";
  if (professionalKeywords.some(keyword => lowerText.includes(keyword))) return "professional";
  if (healthKeywords.some(keyword => lowerText.includes(keyword))) return "health";
  if (technologyKeywords.some(keyword => lowerText.includes(keyword))) return "technology";

  // Default to technology if no keywords match
  return "technology";
};

// Get a relevant video based on title, description, and education level
const getRelevantVideo = (title: string, description: string, educationLevel: string): string => {
  const combinedText = `${title} ${description || ""}`;
  const category = extractKeywords(combinedText);
  
  const level = educationLevel.toLowerCase();
  const availableLevels = Object.keys(videoLibrary);
  
  // If the specified education level doesn't exist, default to middle
  const bestLevel = availableLevels.includes(level) ? level : "middle";
  
  const videosForLevel = videoLibrary[bestLevel as keyof typeof videoLibrary];
  
  // Find videos matching the category, or use the first category if none match
  let categoryVideos: string[] = [];
  if (category in videosForLevel) {
    categoryVideos = videosForLevel[category as keyof typeof videosForLevel];
  } else {
    // If category not found, get first available category
    const firstCategory = Object.keys(videosForLevel)[0];
    categoryVideos = videosForLevel[firstCategory as keyof typeof videosForLevel];
  }
  
  // Pick a video based on a hash of the title (to make it consistent for same title)
  const titleHash = title.split("").reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const index = Math.abs(titleHash) % categoryVideos.length;
  return categoryVideos[index];
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    const { id, title, description, education_level } = requestData;
    
    if (!id || !title || !education_level) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" }, 
          status: 400 
        }
      );
    }

    console.log(`Processing animation request: ${id} - "${title}"`);

    // Get a relevant educational video based on the request data
    const videoUrl = getRelevantVideo(title, description || "", education_level);

    console.log(`Selected video URL: ${videoUrl}`);

    return new Response(
      JSON.stringify({ success: true, message: "Animation generated successfully", videoUrl }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" }, 
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500
      }
    );
  }
});
