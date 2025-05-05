
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
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
        video_url: videoUrl
      })
      .eq('id', id);

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating request with video:', error);
    return false;
  }
};
