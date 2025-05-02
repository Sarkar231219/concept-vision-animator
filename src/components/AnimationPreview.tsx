
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  Edit, 
  Play, 
  Share2
} from "lucide-react";

interface AnimationPreviewProps {
  isReady: boolean;
  animationUrl?: string;
  onEdit: () => void;
}

const AnimationPreview: React.FC<AnimationPreviewProps> = ({ 
  isReady,
  animationUrl,
  onEdit
}) => {
  return (
    <Card className="shadow-lg border-2 border-gray-100">
      <CardContent className="p-0">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-xl font-bold">Animation Preview</h3>
        </div>

        <div className="flex flex-col items-center justify-center bg-gray-50 aspect-video w-full min-h-[300px] relative overflow-hidden">
          {isReady ? (
            <>
              <div className="w-full h-full">
                <div className="relative w-full h-full">
                  <iframe 
                    src={animationUrl || "https://placeholder-animation.com"}
                    className="absolute inset-0 w-full h-full"
                    title="Educational Animation"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8">
              <div className="relative w-24 h-24 mb-4">
                <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></div>
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-500 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2 gradient-text">Your Animation Is Coming...</h3>
              <p className="text-gray-500 max-w-md">
                We're creating your educational animation. This process may take a few minutes as our AI generates high-quality visuals and narration.
              </p>
            </div>
          )}
        </div>

        {isReady && (
          <div className="p-4">
            <Tabs defaultValue="visual">
              <TabsList className="w-full grid grid-cols-3 mb-4">
                <TabsTrigger value="visual">Visual Style</TabsTrigger>
                <TabsTrigger value="narration">Narration</TabsTrigger>
                <TabsTrigger value="timing">Timing</TabsTrigger>
              </TabsList>
              <TabsContent value="visual" className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start">
                    <div className="w-4 h-4 rounded bg-blue-500 mr-2"></div>
                    Modern
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <div className="w-4 h-4 rounded bg-orange-500 mr-2"></div>
                    Playful
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <div className="w-4 h-4 rounded bg-teal-500 mr-2"></div>
                    Scientific
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <div className="w-4 h-4 rounded bg-purple-500 mr-2"></div>
                    Abstract
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="narration">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Voice Speed</span>
                    <span className="text-sm font-medium">1.0x</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="2" 
                    step="0.1" 
                    defaultValue="1"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </TabsContent>
              <TabsContent value="timing">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Animation Speed</span>
                    <span className="text-sm font-medium">Normal</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm">Slower</Button>
                    <Button variant="secondary" size="sm">Normal</Button>
                    <Button variant="outline" size="sm">Faster</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        <div className="flex flex-wrap gap-2 p-4 border-t border-gray-100">
          <Button 
            variant={isReady ? "default" : "secondary"}
            className={isReady ? "bg-education-blue hover:bg-education-blue/90" : "bg-gray-100 text-gray-400"}
            disabled={!isReady}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button 
            variant="outline" 
            onClick={onEdit}
            disabled={!isReady}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            className="ml-auto"
            disabled={!isReady}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimationPreview;
