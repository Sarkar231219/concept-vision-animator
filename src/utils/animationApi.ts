
import { toast } from "sonner";
import { supabase, callFunction } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { AnimationFormData } from "@/types/animation";

// Save the animation request to Supabase
export const saveAnimationRequest = async (formData: AnimationFormData) => {
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
    
    return id;
  } catch (error) {
    console.error('Error saving animation request:', error);
    toast.error('Failed to save animation request');
    return null;
  }
};

// Poll for animation updates
export const pollAnimationStatus = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('animation_requests')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error polling animation status:', error);
    return null;
  }
};

// Update animation request status
export const updateRequestStatus = async (id: string, status: string) => {
  try {
    const { error } = await supabase
      .from('animation_requests')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating request status:', error);
    return false;
  }
};

// Update animation request with video URL
export const updateRequestWithVideo = async (id: string, videoUrl: string) => {
  try {
    const { error } = await supabase
      .from('animation_requests')
      .update({
        status: 'completed',
        video_url: videoUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating request with video:', error);
    return false;
  }
};

// Call the edge function to generate an animation
export const generateAnimation = async (id: string, title: string, description: string | null, educationLevel: string) => {
  try {
    const response = await callFunction('generate-educational-video', {
      id,
      title,
      description,
      education_level: educationLevel
    });
    
    if (!response || !response.videoUrl) {
      throw new Error('No video URL returned');
    }
    
    // Update the database with the new video URL
    await updateRequestWithVideo(id, response.videoUrl);
    
    return response.videoUrl;
  } catch (error) {
    console.error('Error generating animation:', error);
    toast.error('Failed to generate animation');
    
    // Update status to failed
    await updateRequestStatus(id, 'failed');
    
    return null;
  }
};
