
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Loader2 } from "lucide-react";

interface StoryboardStep {
  id: number;
  title: string;
  description: string;
  visualDescription: string;
  status: "pending" | "active" | "complete";
}

interface StoryboardPreviewProps {
  steps: StoryboardStep[];
  currentStep: number;
}

const StoryboardPreview: React.FC<StoryboardPreviewProps> = ({ steps, currentStep }) => {
  return (
    <Card className="w-full shadow-md border border-gray-100">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-6">Storyboard Generation</h3>
        <div className="space-y-5">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`flex gap-4 p-4 rounded-lg transition-all duration-300 ${
                step.status === "active" 
                  ? "bg-blue-50 border-l-4 border-education-blue step-animation" 
                  : step.status === "complete" 
                  ? "bg-gray-50 border-l-4 border-green-500" 
                  : "bg-gray-50"
              }`}
              style={{ 
                animationDelay: `${step.id * 0.2}s`,
                opacity: step.status === "pending" ? 0.5 : 1
              }}
            >
              <div className="mt-0.5">
                {step.status === "active" ? (
                  <div className="w-6 h-6 rounded-full bg-education-blue flex items-center justify-center">
                    <Loader2 className="h-4 w-4 text-white animate-spin" />
                  </div>
                ) : step.status === "complete" ? (
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-semibold text-gray-800">{step.title}</h4>
                  <Badge 
                    variant={
                      step.status === "active" 
                        ? "secondary" 
                        : step.status === "complete" 
                        ? "outline" 
                        : "secondary"
                    }
                    className={
                      step.status === "active" 
                        ? "bg-education-blue/20 text-education-blue" 
                        : step.status === "complete" 
                        ? "bg-green-100 text-green-800 border-green-300" 
                        : "bg-gray-200 text-gray-500"
                    }
                  >
                    {step.status === "active" 
                      ? "In Progress" 
                      : step.status === "complete" 
                      ? "Completed" 
                      : "Pending"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                {step.visualDescription && step.status !== "pending" && (
                  <div className="mt-2 p-3 bg-white border border-gray-200 rounded-md text-sm italic">
                    <span className="font-medium">Visual:</span> {step.visualDescription}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryboardPreview;
