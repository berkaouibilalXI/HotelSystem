import { useState, useEffect } from "react";
import { toast } from "sonner";
import DashboardSidebar from "@/components/admin/DashboardSidebar";
import { useTheme } from "@/components/theme-provider";
import { updateSiteSettings, getSiteSettings } from "@/firebase/firestore";

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteTitle: "B-Hotel",
    siteDescription: "Luxury hotel booking platform",
    contactEmail: "info@b-hotel.com",
    contactPhone: "+1 (555) 123-4567",
    address: "123 Hotel Street, City, Country",
    socialLinks: {
      facebook: "https://facebook.com/bhotel",
      twitter: "https://twitter.com/bhotel",
      instagram: "https://instagram.com/bhotel",
    },
    footerText: "© 2023 B-Hotel. All rights reserved.",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSiteSettings();
        if (data) {
          setSettings(data);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast.error("Failed to load site settings");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setSettings({
        ...settings,
        [parent]: {
          ...settings[parent],
          [child]: value,
        },
      });
    } else {
      setSettings({
        ...settings,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateSiteSettings(settings);
      toast.success("Site settings updated successfully");
      
      // Update document title
      document.title = settings.siteTitle;
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update site settings");
    } finally {
      setSaving(false);
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Site Settings</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your website settings and appearance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* General Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                General Settings
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Site Title
                    </label>
                    <input
                      type="text"
                      name="siteTitle"
                      value={settings.siteTitle}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Site Description
                    </label>
                    <textarea
                      name="siteDescription"
                      value={settings.siteDescription}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel-500 dark:bg-gray-700 dark:text-white"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={settings.contactEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="text"
                      name="contactPhone"
                      value={settings.contactPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={settings.address}
                      onChange={handleChange}
                      rows="2"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel-500 dark:bg-gray-700 dark:text-white"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Footer Text
                    </label>
                    <input
                      type="text"
                      name="footerText"
                      value={settings.footerText}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-hotel-600 hover:bg-hotel-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? "Saving..." : "Save Settings"}
                  </button>
                </div>
              </form>
            </div>

            {/* Appearance Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Appearance Settings
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Theme Mode
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setTheme("light")}
                      className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-all ${
                        theme === "light"
                          ? "border-hotel-500 bg-hotel-50 dark:bg-hotel-900"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <svg
                        className="w-8 h-8 text-yellow-500 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        ></path>
                      </svg>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Light
                      </span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setTheme("dark")}
                      className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-all ${
                        theme === "dark"
                          ? "border-hotel-500 bg-hotel-50 dark:bg-hotel-900"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <svg
                        className="w-8 h-8 text-gray-700 dark:text-gray-300 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        ></path>
                      </svg>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Dark
                      </span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setTheme("system")}
                      className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-all ${
                        theme === "system"
                          ? "border-hotel-500 bg-hotel-50 dark:bg-hotel-900"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <svg
                        className="w-8 h-8 text-blue-500 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        System
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Social Media Links
                  </label>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Facebook
                      </label>
                      <input
                        type="url"
                        name="socialLinks.facebook"
                        value={settings.socialLinks.facebook}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Twitter
                      </label>
                      <input
                        type="url"
                        name="socialLinks.twitter"
                        value={settings.socialLinks.twitter}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Instagram
                      </label>
                      <input
                        type="url"
                        name="socialLinks.instagram"
                        value={settings.socialLinks.instagram}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
