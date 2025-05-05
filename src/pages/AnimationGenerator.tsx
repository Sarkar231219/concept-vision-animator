
import React from "react";
import ConceptInput from "@/components/ConceptInput";
import StoryboardPreview from "@/components/StoryboardPreview";
import AnimationPreview from "@/components/AnimationPreview";
import AnimationHistory from "@/components/AnimationHistory";
import { Separator } from "@/components/ui/separator";
import { useAnimationGenerator } from "@/hooks/useAnimationGenerator";
import AnimationGeneratorLayout from "@/components/AnimationGeneratorLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AnimationGenerator: React.FC = () => {
  const {
    formData,
    updateFormData,
    isGenerating,
    currentStep,
    steps,
    isAnimationReady,
    animationUrl,
    handleGenerate,
    handleEditAnimation
  } = useAnimationGenerator();
  
  return (
    <AnimationGeneratorLayout>
      <div className="md:col-span-5 space-y-8">
        <div>
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="create">Create Animation</TabsTrigger>
              <TabsTrigger value="history">View History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create">
              <h2 className="text-2xl font-bold mb-4">Create Educational Animation</h2>
              <p className="text-gray-600 mb-6">
                Enter a concept or topic, and our AI will generate an animated 
                educational video tailored to your selected education level.
              </p>
              <ConceptInput 
                title={formData.title}
                setTitle={(value) => updateFormData("title", value)}
                description={formData.description}
                setDescription={(value) => updateFormData("description", value)}
                educationLevel={formData.educationLevel}
                setEducationLevel={(value) => updateFormData("educationLevel", value)}
                language={formData.language}
                setLanguage={(value) => updateFormData("language", value)}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />
            </TabsContent>
            
            <TabsContent value="history">
              <AnimationHistory />
            </TabsContent>
          </Tabs>
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
    </AnimationGeneratorLayout>
  );
};

export default AnimationGenerator;
