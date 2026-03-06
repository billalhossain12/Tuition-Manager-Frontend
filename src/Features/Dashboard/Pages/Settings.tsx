import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useGetMeQuery } from "../../../redux/features/APIEndpoints/userApi/userApi";

interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  designation: string;
  profileImg: string;
  user: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Settings() {
  const { data, isLoading: isLoadingUser } = useGetMeQuery(undefined);
  const user: IUser = data?.data || {};

  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Profile data state with the exact fields
  const [profile, setProfile] = useState<IUser>(user);

  useEffect(() => {
    if (!isLoadingUser && user?._id) {
      setProfile(user);
    }
  }, [data, user]);

  // Handle input changes
  const handleChange = (field: keyof IUser, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setProfile((prev) => ({ ...prev, profileImg: "" }));
  };

  // Validate form
  const validateForm = (): boolean => {
    if (!profile.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!profile.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!profile.phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    // Basic phone validation (adjust as needed)
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(profile.phone.replace(/\s/g, ""))) {
      toast.error("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  // Save profile
  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would typically upload the image and save profile data
      if (imageFile) {
        // Upload image logic - this would return a new URL
        // const uploadedUrl = await uploadImage(imageFile);
        // setProfile(prev => ({ ...prev, profileImg: uploadedUrl }));
        console.log("Uploading image:", imageFile);
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Profile Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Update your personal information
        </p>
      </div>

      {/* Profile Form Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6">
          {/* Profile Picture Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Icon icon="mdi:camera" className="text-teal-600" />
              Profile Picture
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border-4 border-teal-100 dark:border-teal-900">
                  {imagePreview || profile.profileImg ? (
                    <img
                      src={imagePreview || profile.profileImg}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-teal-50 dark:bg-teal-900/30">
                      <Icon
                        icon="mdi:account"
                        className="w-14 h-14 text-teal-600 dark:text-teal-400"
                      />
                    </div>
                  )}
                </div>
                {(imagePreview || profile.profileImg) && (
                  <button
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    title="Remove image"
                  >
                    <Icon icon="mdi:close" className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Upload new picture
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <span className="px-4 py-2 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors flex items-center gap-2 text-sm">
                      <Icon icon="mdi:cloud-upload" className="w-4 h-4" />
                      Choose Image
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 self-center">
                    JPG, PNG or GIF. Max 2MB.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields - Only the specified fields */}
          <div className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <span className="flex items-center gap-2">
                  <Icon icon="mdi:account" className="text-teal-600" />
                  Full Name <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <span className="flex items-center gap-2">
                  <Icon icon="mdi:email" className="text-teal-600" />
                  Email Address <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white transition-colors"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <span className="flex items-center gap-2">
                  <Icon icon="mdi:phone" className="text-teal-600" />
                  Phone Number <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white transition-colors"
                placeholder="Enter your phone number"
              />
            </div>

            {/* City Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <span className="flex items-center gap-2">
                  <Icon icon="mdi:city" className="text-teal-600" />
                  City
                </span>
              </label>
              <input
                type="text"
                value={profile.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white transition-colors"
                placeholder="Enter your city"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
          <div className="flex md:flex-row flex-col-reverse justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                // Reset to original values
                setProfile(user);
                setImagePreview(null);
                setImageFile(null);
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <Icon icon="mdi:loading" className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Icon icon="mdi:content-save" className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Help Text */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
        Fields marked with <span className="text-red-500">*</span> are required
      </p>
    </div>
  );
}
