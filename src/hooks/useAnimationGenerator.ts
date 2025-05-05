
import { useState } from "react";
import { toast } from "sonner";
import { AnimationFormData, StoryboardStep } from "@/types/animation";
import { initialSteps, PLACEHOLDER_ANIMATION_URL } from "@/constants/animation";
import { 
  saveAnimationRequest, 
  pollAnimationStatus, 
  updateRequestStatus, 
  updateRequestWithVideo 
} from "@/utils/animationApi";
import { generateVisualDescription, updateStepStatus } from "@/utils/storyboardUtils";

export { type StepStatus, type StoryboardStep } from "@/types/animation";
export { type AnimationFormData, type AnimationRequest } from "@/types/animation";

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
    setSteps(initialSteps.map(step => ({ ...step, status: "pending", visualDescription: "" })));
    
    // Save the animation request to Supabase
    const requestId = await saveAnimationRequest(formData);
    
    if (!requestId) {
      setIsGenerating(false);
      return;
    }

    setRequestId(requestId);
    
    // Process each step with a delay to simulate AI processing
    await processSteps(requestId);
  };

  const processSteps = async (requestId: string) => {
    // Process each step with a delay to simulate AI processing
    for (let i = 0; i < steps.length; i++) {
      // Set current step to active
      setCurrentStep(i);
      setSteps(prev => 
        updateStepStatus(prev, i + 1, "active")
      );

      // Update status to processing after first step starts
      if (i === 0) {
        await updateRequestStatus(requestId, 'processing');
      }

      // Wait for a few seconds to simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

      // Generate visual descriptions based on the step
      const visualDescription = generateVisualDescription(i, formData);

      // Mark step as complete and add visual description
      setSteps(prev => 
        updateStepStatus(prev, i + 1, "complete", visualDescription)
      );
    }

    // For demo purposes, we'll use a placeholder video URL
    const videoUrl = PLACEHOLDER_ANIMATION_URL;
    
    // Update the request with the video URL
    await updateRequestWithVideo(requestId, videoUrl);

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
