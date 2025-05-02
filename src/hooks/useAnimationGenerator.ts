import { useState } from "react";
import { toast } from "sonner";

// Using a reliable public domain animation from Pixabay instead of YouTube
const SAMPLE_ANIMATION_URL = "https://player.vimeo.com/video/435127897"; // Public domain animation video

export type StepStatus = "pending" | "active" | "complete";

export interface StoryboardStep {
  id: number;
  title: string;
  description: string;
  visualDescription: string;
  status: StepStatus;
}

// Initial storyboard steps
const initialSteps = [
  {
    id: 1,
    title: "Concept Analysis",
    description: "Analyzing the concept and breaking it down into key components",
    visualDescription: "",
    status: "pending" as StepStatus
  },
  {
    id: 2,
    title: "Content Structure",
    description: "Organizing the learning material in a logical sequence",
    visualDescription: "",
    status: "pending" as StepStatus
  },
  {
    id: 3,
    title: "Visual Storyboarding",
    description: "Creating visual representations for each key concept",
    visualDescription: "",
    status: "pending" as StepStatus
  },
  {
    id: 4,
    title: "Script Generation",
    description: "Creating narration script with appropriate language for the target audience",
    visualDescription: "",
    status: "pending" as StepStatus
  },
  {
    id: 5,
    title: "Animation Rendering",
    description: "Generating the final animation with synchronized narration",
    visualDescription: "",
    status: "pending" as StepStatus
  }
];

export interface AnimationFormData {
  title: string;
  description: string;
  educationLevel: string;
  language: string;
}

export const useAnimationGenerator = () => {
  // Form state
  const [formData, setFormData] = useState<AnimationFormData>({
    title: "",
    description: "",
    educationLevel: "middle",
    language: "english",
  });
  
  // Process state
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<StoryboardStep[]>(initialSteps);
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  const [animationUrl, setAnimationUrl] = useState("");

  const updateFormData = (field: keyof AnimationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Simulated generation process
  const handleGenerate = () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a concept title");
      return;
    }

    setIsGenerating(true);
    
    // Reset previous generation if any
    setCurrentStep(0);
    setIsAnimationReady(false);
    setAnimationUrl("");
    setSteps(initialSteps.map(step => ({ ...step, status: "pending" as StepStatus, visualDescription: "" })));
    
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
            ? { ...step, status: "active" as StepStatus } 
            : step
        )
      );

      // Wait for a few seconds to simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

      // Generate visual descriptions based on the step
      let visualDescription = "";
      
      switch (i) {
        case 0: // Concept Analysis
          visualDescription = `"${formData.title}" will be presented as ${
            formData.title.toLowerCase().includes("program") ? "a computational concept with code examples" : 
            formData.title.toLowerCase().includes("biology") ? "a biological process with cellular diagrams" : 
            "an educational concept with visual metaphors"
          }.`;
          break;
        case 1: // Content Structure
          visualDescription = `Introduction → Key Components → Examples → Applications ${
            formData.educationLevel === "elementary" ? "→ Simple Quiz" : 
            formData.educationLevel === "college" ? "→ Advanced Implications → Research Directions" : 
            "→ Practice Activities"
          }`;
          break;
        case 2: // Visual Storyboarding
          visualDescription = `Using ${
            formData.educationLevel === "elementary" ? "colorful cartoon characters and simple diagrams" : 
            formData.educationLevel === "college" ? "detailed technical diagrams and professional illustrations" : 
            "mixed media illustrations with intermediate complexity"
          } to represent the concept.`;
          break;
        case 3: // Script Generation
          visualDescription = `Narration script created with ${formData.language} vocabulary appropriate for ${formData.educationLevel} level. ${
            formData.language !== "english" ? `Primary narration in ${formData.language} with English subtitles available.` : ""
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
            ? { ...step, status: "complete" as StepStatus, visualDescription } 
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

  return {
    formData,
    updateFormData,
    isGenerating,
    currentStep,
    steps,
    isAnimationReady,
    animationUrl,
    handleGenerate,
    handleEditAnimation
  };
};
