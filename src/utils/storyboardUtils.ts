
import { StoryboardStep, StepStatus } from "@/types/animation";
import { AnimationFormData } from "@/types/animation";

// Generate visual descriptions based on the step and form data
export const generateVisualDescription = (
  stepIndex: number, 
  formData: AnimationFormData
): string => {
  let visualDescription = "";
  
  switch (stepIndex) {
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
    default:
      visualDescription = "";
  }
  
  return visualDescription;
};

// Update step status in the steps array
export const updateStepStatus = (
  steps: StoryboardStep[], 
  stepId: number, 
  status: StepStatus, 
  visualDescription: string = ""
): StoryboardStep[] => {
  return steps.map(step => 
    step.id === stepId 
      ? { ...step, status, visualDescription: visualDescription || step.visualDescription } 
      : step
  );
};
