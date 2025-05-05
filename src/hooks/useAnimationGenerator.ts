
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

// Sample animation placeholder (used while actual animation is being generated)
const PLACEHOLDER_ANIMATION_URL = "https://player.vimeo.com/video/435127897";

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

export interface AnimationRequest {
  id: string;
  title: string;
  description: string | null;
  education_level: string;
  language: string;
  status: "pending" | "processing" | "completed" | "failed";
  video_url: string | null;
  created_at: string;
  updated_at: string;
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
  const [requestId, setRequestId] = useState<string | null>(null);

  const updateFormData = (field: keyof AnimationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Save the animation request to Supabase
  const saveAnimationRequest = async () => {
    try {
      const id = uuidv4();
      
      const { error } = await supabase.from('animation_requests').insert({
        id,
        title: formData.title,
        description: formData.description || null,
        education_level: formData.educationLevel,
        language: formData.language,
        status: 'pending',
        video_url: null
      });

      if (error) throw error;
      
      setRequestId(id);
      return id;
    } catch (error) {
      console.error('Error saving animation request:', error);
      toast.error('Failed to save animation request');
      return null;
    }
  };

  // Poll for animation updates
  const pollAnimationStatus = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('animation_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data.status === 'completed' && data.video_url) {
        setIsAnimationReady(true);
        setAnimationUrl(data.video_url);
        setIsGenerating(false);
        return true;
      } else if (data.status === 'failed') {
        toast.error('Animation generation failed');
        setIsGenerating(false);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error polling animation status:', error);
      return false;
    }
  };

  // Simulated generation process
  const handleGenerate = async () => {
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
    
    // Save the animation request to Supabase
    const requestId = await saveAnimationRequest();
    
    if (!requestId) {
      setIsGenerating(false);
      return;
    }

    // Simulate the generation process with delays
    await processSteps(requestId);
  };

  const processSteps = async (requestId: string) => {
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

      // Update status to processing after first step starts
      if (i === 0) {
        await supabase
          .from('animation_requests')
          .update({ status: 'processing' })
          .eq('id', requestId);
      }

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

    // For demo purposes, we'll use a placeholder video URL
    // In a real application, we would wait for the actual video to be generated
    const videoUrl = PLACEHOLDER_ANIMATION_URL;
    
    // Update the request with the video URL
    await supabase
      .from('animation_requests')
      .update({
        status: 'completed',
        video_url: videoUrl
      })
      .eq('id', requestId);

    // Set animation as ready
    setIsAnimationReady(true);
    setAnimationUrl(videoUrl);
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
    handleEditAnimation,
    requestId
  };
};
