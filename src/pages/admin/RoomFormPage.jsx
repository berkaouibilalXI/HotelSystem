import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoom, addRoom, updateRoom } from "@/firebase/firestore";
import DashboardSidebar from "@/components/admin/DashboardSidebar";
import { toast } from "sonner";
import { useAuth } from "@/firebase/auth-context";
import { compressImage, fileToBase64, uploadAllImages } from "@/utils/imageUtils";
import RoleDebugger from "@/components/RoleDebugger";
import FirestoreTest from "@/components/FirestoreTest";

const RoomFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    type: "standard",
    description: "",
    price: 100,
    capacity: 2,
    size: 25,
    amenities: [],
    images: [],
    available: true
  });

  const amenitiesOptions = [
    "Free WiFi",
    "Air Conditioning",
    "TV",
    "Mini Bar",
    "Room Service",
    "Safe",
    "Balcony",
    "Ocean View",
    "Mountain View",
    "Bathtub",
    "Shower",
    "King Bed",
    "Queen Bed",
    "Twin Beds"
  ];

  useEffect(() => {
    if (isEditMode) {
      const fetchRoom = async () => {
        try {
          const roomData = await getRoom(id);
          if (roomData) {
            setFormData(roomData);
            // Set preview URLs for existing images
            setImagePreviewUrls(roomData.images || []);
          } else {
            toast.error("Room not found");
            navigate("/dashboard/rooms");
          }
        } catch (error) {
          console.error("Error fetching room:", error);
          toast.error("Failed to load room data");
        } finally {
          setLoading(false);
        }
      };

      fetchRoom();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, value]
      });
    } else {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter(amenity => amenity !== value)
      });
    }
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setImageFiles([...imageFiles, ...files]);
    
    // Create preview URLs
    const newPreviewUrls = await Promise.all(
      files.map(async (file) => {
        // Generate preview using base64
        return await fileToBase64(file);
      })
    );
    
    setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);
  };

  const handleAddImageUrl = () => {
    if (!imageUrl) {
      toast.error("Please enter a valid image URL");
      return;
    }

    // Validate URL format
    try {
      new URL(imageUrl);
    } catch (e) {
      toast.error("Please enter a valid URL");
      return;
    }

    // Add URL to preview and form data
    setImagePreviewUrls([...imagePreviewUrls, imageUrl]);
    setFormData({
      ...formData,
      images: [...formData.images, imageUrl]
    });
    
    // Clear the input
    setImageUrl("");
    
    toast.success("Image URL added");
  };

  const removeImage = (index) => {
    // If it's a new image (from imageFiles)
    if (index < imageFiles.length) {
      const newImageFiles = [...imageFiles];
      newImageFiles.splice(index, 1);
      setImageFiles(newImageFiles);
      
      const newPreviewUrls = [...imagePreviewUrls];
      newPreviewUrls.splice(index, 1);
      setImagePreviewUrls(newPreviewUrls);
    } 
    // If it's an existing image (from formData.images)
    else {
      const existingIndex = index - imageFiles.length;
      const newImages = [...formData.images];
      newImages.splice(existingIndex, 1);
      setFormData({ ...formData, images: newImages });
      
      const newPreviewUrls = [...imagePreviewUrls];
      newPreviewUrls.splice(index, 1);
      setImagePreviewUrls(newPreviewUrls);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is authenticated and has proper role
    if (!user) {
      toast.error("You must be logged in to perform this action");
      navigate("/login");
      return;
    }
    
    // Log user role for debugging
    console.log("Current user role:", user.role);
    
    if (user.role !== "admin" && user.role !== "staff") {
      toast.error("You don't have permission to perform this action");
      return;
    }
    
    // Validate form data
    if (!formData.name || !formData.description || formData.price <= 0) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Validate that there's at least one image (either from files or URLs)
    if (imageFiles.length === 0 && formData.images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }
    
    setSubmitting(true);

    try {
      let updatedFormData = { ...formData };
      
      // Upload new images if any
      if (imageFiles.length > 0) {
        try {
          // Simplified approach - just upload all images and get URLs
          const uploadedImageUrls = await uploadAllImages(imageFiles);
          
          // Combine with existing images
          updatedFormData.images = [...(formData.images || []), ...uploadedImageUrls];
        } catch (uploadError) {
          console.error("Error uploading images:", uploadError);
          toast.error(`Failed to upload images: ${uploadError.message}`);
          setSubmitting(false);
          return;
        }
      }

      if (isEditMode) {
        await updateRoom(id, updatedFormData);
        toast.success("Room updated successfully");
      } else {
        await addRoom(updatedFormData);
        toast.success("Room added successfully");
      }
      
      navigate("/dashboard/rooms");
    } catch (error) {
      console.error("Error saving room:", error);
      if (error.code) {
        toast.error(`Failed to save room: ${error.code}`);
      } else {
        toast.error(`Failed to save room: ${error.message || "Unknown error"}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <DashboardSidebar />
        <div className="flex-1 md:ml-64 pt-16 md:pt-0">
          <div className="p-4 md:p-8 flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hotel-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1 md:ml-64 pt-16 md:pt-0">
        <div className="p-4 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {isEditMode ? "Edit Room" : "Add New Room"}
            </h1>
            <button
              onClick={() => navigate("/dashboard/rooms")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-4 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Room Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Room Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                {/* Room Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Room Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="suite">Suite</option>
                    <option value="family">Family</option>
                    <option value="executive">Executive</option>
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price per Night ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Capacity (Guests)
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    min="1"
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                {/* Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Room Size (m²)
                  </label>
                  <input
                    type="number"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    min="1"
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                {/* Availability */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="available"
                    name="available"
                    checked={formData.available}
                    onChange={handleChange}
                    className="h-4 w-4 text-hotel-600 focus:ring-hotel-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label
                    htmlFor="available"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Available for Booking
                  </label>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                ></textarea>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amenities
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {amenitiesOptions.map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`amenity-${amenity}`}
                        name="amenities"
                        value={amenity}
                        checked={formData.amenities.includes(amenity)}
                        onChange={handleAmenityChange}
                        className="h-4 w-4 text-hotel-600 focus:ring-hotel-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label
                        htmlFor={`amenity-${amenity}`}
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Room Images
                </label>
                
                {/* File upload */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload from device</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-hotel-50 file:text-hotel-700 hover:file:bg-hotel-100 dark:text-gray-400 dark:file:bg-hotel-900 dark:file:text-hotel-300"
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    You can upload multiple images. Recommended size: 1200x800 pixels.
                  </p>
                </div>
                
                {/* URL input */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Add from URL</p>
                  <div className="flex">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 border border-gray-300 dark:border-gray-700 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="bg-hotel-600 hover:bg-hotel-700 text-white px-4 py-2 rounded-r-md transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Enter a direct URL to an image (JPG, PNG, WebP formats).
                  </p>
                </div>

                {/* Image Previews */}
                {imagePreviewUrls.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {imagePreviewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Room preview ${index + 1}`}
                          className="h-32 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-hotel-600 hover:bg-hotel-700 text-white px-6 py-2 rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </div>
                  ) : isEditMode ? (
                    "Update Room"
                  ) : (
                    "Add Room"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomFormPage;
