
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

interface ConceptInputProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  educationLevel: string;
  setEducationLevel: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const ConceptInput: React.FC<ConceptInputProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  educationLevel,
  setEducationLevel,
  language,
  setLanguage,
  onGenerate,
  isGenerating
}) => {
  return (
    <Card className="w-full shadow-lg border-2 border-gray-100">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-lg font-semibold">Concept Title</Label>
          <Input
            id="title"
            placeholder="E.g., 'Inheritance in OOP' or 'Photosynthesis'"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description" className="text-lg font-semibold">Description (optional)</Label>
          <Textarea
            id="description"
            placeholder="Add more details about this concept to improve the generated animation..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[120px] text-base"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="education-level" className="font-semibold">Education Level</Label>
            <Select value={educationLevel} onValueChange={setEducationLevel}>
              <SelectTrigger id="education-level">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="elementary">Elementary School (K-5)</SelectItem>
                <SelectItem value="middle">Middle School (6-8)</SelectItem>
                <SelectItem value="high">High School (9-12)</SelectItem>
                <SelectItem value="college">College</SelectItem>
                <SelectItem value="adult">Adult Learning</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language" className="font-semibold">Narration Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="chinese">Chinese</SelectItem>
                <SelectItem value="japanese">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={onGenerate}
          disabled={!title || isGenerating}
          className="w-full py-6 text-lg font-semibold mt-4 bg-gradient-to-r from-education-blue to-education-purple hover:opacity-90 transition-opacity"
        >
          <Sparkles className="h-5 w-5 mr-2" />
          {isGenerating ? "Generating Animation..." : "Generate Educational Animation"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConceptInput;
