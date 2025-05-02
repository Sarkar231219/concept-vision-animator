
import React, { useState } from "react";
import ConceptInput from "@/components/ConceptInput";
import StoryboardPreview from "@/components/StoryboardPreview";
import AnimationPreview from "@/components/AnimationPreview";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

// Mock animation URL for demo purposes
const SAMPLE_ANIMATION_URL = "https://www.youtube.com/embed/MUQfKFzIOeU";

// Initial storyboard steps
const initialSteps = [
  {
    id: 1,
    title: "Concept Analysis",
    description: "Analyzing the concept and breaking it down into key components",
    visualDescription: "",
    status: "pending" as const
  },
  {
    id: 2,
    title: "Content Structure",
    description: "Organizing the learning material in a logical sequence",
    visualDescription: "",
    status: "pending" as const
  },
  {
    id: 3,
    title: "Visual Storyboarding",
    description: "Creating visual representations for each key concept",
    visualDescription: "",
    status: "pending" as const
  },
  {
    id: 4,
    title: "Script Generation",
    description: "Creating narration script with appropriate language for the target audience",
    visualDescription: "",
    status: "pending" as const
  },
  {
    id: 5,
    title: "Animation Rendering",
    description: "Generating the final animation with synchronized narration",
    visualDescription: "",
    status: "pending" as const
  }
];

const AnimationGenerator: React.FC = () => {
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [educationLevel, setEducationLevel] = useState("middle");
  const [language, setLanguage] = useState("english");
  
  // Process state
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(initialSteps);
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  const [animationUrl, setAnimationUrl] = useState("");

  // Simulated generation process
  const handleGenerate = () => {
    if (!title.trim()) {
      toast.error("Please enter a concept title");
      return;
    }

    setIsGenerating(true);
    
    // Reset previous generation if any
    setCurrentStep(0);
    setIsAnimationReady(false);
    setAnimationUrl("");
    setSteps(initialSteps.map(step => ({ ...step, status: "pending", visualDescription: "" })));
    
    // Simulate the generation process with delays
    processSteps();
  };

  const processSteps = async () => {
    // Process each step with a delay to simulate AI processing
    for (let i = 0; i < steps.length; i++) {
      // Set current step to active
      setCurrentStep(i);
      setSteps(prev => 
        prev.map(step => 
          step.id === i + 1 
            ? { ...step, status: "active" } 
            : step
        )
      );

      // Wait for a few seconds to simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

      // Generate visual descriptions based on the step
      let visualDescription = "";
      
      switch (i) {
        case 0: // Concept Analysis
          visualDescription = `"${title}" will be presented as ${
            title.toLowerCase().includes("program") ? "a computational concept with code examples" : 
            title.toLowerCase().includes("biology") ? "a biological process with cellular diagrams" : 
            "an educational concept with visual metaphors"
          }.`;
          break;
        case 1: // Content Structure
          visualDescription = `Introduction → Key Components → Examples → Applications ${
            educationLevel === "elementary" ? "→ Simple Quiz" : 
            educationLevel === "college" ? "→ Advanced Implications → Research Directions" : 
            "→ Practice Activities"
          }`;
          break;
        case 2: // Visual Storyboarding
          visualDescription = `Using ${
            educationLevel === "elementary" ? "colorful cartoon characters and simple diagrams" : 
            educationLevel === "college" ? "detailed technical diagrams and professional illustrations" : 
            "mixed media illustrations with intermediate complexity"
          } to represent the concept.`;
          break;
        case 3: // Script Generation
          visualDescription = `Narration script created with ${language} vocabulary appropriate for ${educationLevel} level. ${
            language !== "english" ? `Primary narration in ${language} with English subtitles available.` : ""
          }`;
          break;
        case 4: // Final Rendering
          visualDescription = "Animation rendered with synchronized audio and visual elements, optimized for both mobile and desktop viewing.";
          break;
      }

      // Mark step as complete and add visual description
      setSteps(prev => 
        prev.map(step => 
          step.id === i + 1 
            ? { ...step, status: "complete", visualDescription } 
            : step
        )
      );
    }

    // Set animation as ready
    setIsAnimationReady(true);
    setAnimationUrl(SAMPLE_ANIMATION_URL);
    setIsGenerating(false);
    
    toast.success("Your educational animation is ready!");
  };

  const handleEditAnimation = () => {
    toast.info("Editing functionality will be available in the next version!");
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Create Educational Animation</h2>
            <p className="text-gray-600 mb-6">
              Enter a concept or topic, and our AI will generate an animated 
              educational video tailored to your selected education level.
            </p>
            <ConceptInput 
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              educationLevel={educationLevel}
              setEducationLevel={setEducationLevel}
              language={language}
              setLanguage={setLanguage}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>

          {(isGenerating || currentStep > 0) && (
            <div className="transition-all duration-300">
              <StoryboardPreview 
                steps={steps} 
                currentStep={currentStep} 
              />
            </div>
          )}
        </div>

        <div className="hidden md:block">
          <Separator orientation="vertical" className="h-full mx-auto" />
        </div>

        <div className="md:col-span-6">
          <h2 className="text-2xl font-bold mb-6">Animation Output</h2>
          <AnimationPreview 
            isReady={isAnimationReady} 
            animationUrl={animationUrl}
            onEdit={handleEditAnimation}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimationGenerator;
