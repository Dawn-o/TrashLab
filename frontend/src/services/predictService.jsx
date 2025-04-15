import axios from '../api/AxiosInstance';

const TRIAL_KEY = 'prediction_trial_used';

export const predictTrash = async (imageFile) => {
  if (!imageFile) throw new Error('No image file provided');
  
  // Check if trial was already used
  const trialUsed = localStorage.getItem(TRIAL_KEY);
  if (trialUsed) {
    throw new Error('Please login to continue using this feature');
  }

  // Validate file size and type
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  
  if (imageFile.size > maxSize) {
    throw new Error('File size exceeds 5MB limit');
  }
  if (!allowedTypes.includes(imageFile.type)) {
    throw new Error('File type not supported. Use JPG, JPEG or PNG');
  }

  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axios.post('/temp-predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    
    // Mark trial as used after successful prediction
    localStorage.setItem(TRIAL_KEY, 'true');
    
    return response.data.results[0];
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Please login to continue using this feature');
    }
    throw new Error(error.response?.data?.message || 'Failed to predict image');
  }
};