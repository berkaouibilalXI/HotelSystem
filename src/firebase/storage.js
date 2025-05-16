import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { app } from "./config";

const storage = getStorage(app);

// Upload an image file to Firebase Storage
export const uploadImage = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Delete an image from Firebase Storage
export const deleteImage = async (url) => {
  try {
    // Extract the path from the URL
    const decodedUrl = decodeURIComponent(url);
    const startIndex = decodedUrl.indexOf('/o/') + 3;
    const endIndex = decodedUrl.indexOf('?');
    const path = decodedUrl.substring(startIndex, endIndex);
    
    const imageRef = ref(storage, path);
    await deleteObject(imageRef);
    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};
