
export type StepStatus = "pending" | "active" | "complete";

export interface StoryboardStep {
  id: number;
  title: string;
  description: string;
  visualDescription: string;
  status: StepStatus;
}

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
