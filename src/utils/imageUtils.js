import imageCompression from 'browser-image-compression';

// Compress image file
export const compressImage = async (file) => {
  try {
    const options = {
      maxSizeMB: 1, // Max file size in MB
      maxWidthOrHeight: 1200, // Max width/height in pixels
      useWebWorker: true
    };
    
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
};

// Convert file to base64 for preview
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Upload image to ImgBB (free image hosting)
export const uploadToImgBB = async (file) => {
  try {
    // Compress the image first
    const compressedFile = await compressImage(file);
    
    // Create form data for upload
    const formData = new FormData();
    formData.append('image', compressedFile);
    
    // Get API key from environment variables
    const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
    
    if (!API_KEY) {
      throw new Error('ImgBB API key is missing. Please add VITE_IMGBB_API_KEY to your .env file');
    }
    
    // Upload to ImgBB
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error(data.error?.message || 'Failed to upload image');
    }
  } catch (error) {
    console.error("Error uploading to ImgBB:", error);
    throw error;
  }
};

// Upload all images and return URLs
export const uploadAllImages = async (files) => {
  try {
    if (!files || files.length === 0) {
      return [];
    }
    
    // Upload each image to ImgBB
    const uploadPromises = files.map(async (file) => {
      return await uploadToImgBB(file);
    });
    
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error uploading all images:", error);
    throw error;
  }
};
