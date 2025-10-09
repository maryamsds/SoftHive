import React, { useState } from "react";
import {
  Download,
  Repeat,
  Trash2,
  Star,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const sampleMedia = [
  {
    id: 1,
    type: "image",
    thumbnail: "https://placehold.co/600x400",
    caption: "Summer Collection Lifestyle Shot",
    campaign: "Summer 2025",
    platform: "Instagram",
    date: "2025-09-28",
    isFavorite: true,
  },
  {
    id: 2,
    type: "video",
    thumbnail: "https://placehold.co/600x400",
    caption: "Product Showcase Reel",
    campaign: "Fall Collection",
    platform: "TikTok",
    date: "2025-09-27",
    isFavorite: false,
  },
  {
    id: 3,
    type: "image",
    thumbnail: "https://placehold.co/600x400",
    caption: "Holiday Promo Banner",
    campaign: "Holiday Special",
    platform: "Facebook",
    date: "2025-09-25",
    isFavorite: false,
  },
];

const campaigns = ["All Campaigns", "Summer 2025", "Fall Collection", "Holiday Special"];
const platforms = ["All Platforms", "Facebook", "Instagram", "TikTok", "YouTube"];

const MediaLibrary = () => {
  const [media, setMedia] = useState(sampleMedia);
  const [selectedCampaign, setSelectedCampaign] = useState("All Campaigns");
  const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [favorites, setFavorites] = useState(
    new Set(sampleMedia.filter((item) => item.isFavorite).map((item) => item.id))
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMedia, setNewMedia] = useState({
    caption: "",
    description: "",
    campaign: "",
    platform: "",
    type: "image",
  });
  const [errors, setErrors] = useState({});

  // Toggle favorite
  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
    setFavorites(newFavorites);
  };

  // Delete
  const handleDelete = (id) => {
    setMedia(media.filter((item) => item.id !== id));
  };

  // Upload form validation
  const handleUpload = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!/^[A-Za-z\s]+$/.test(newMedia.caption.trim())) {
      newErrors.caption = "Caption should contain only letters and spaces.";
    }
    if (!newMedia.description.trim()) {
      newErrors.description = "Description is required.";
    }
    if (!newMedia.campaign) {
      newErrors.campaign = "Please select a campaign.";
    }
    if (!newMedia.platform) {
      newErrors.platform = "Please select a platform.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const newItem = {
      id: Date.now(),
      type: newMedia.type,
      thumbnail: "https://placehold.co/600x400",
      caption: newMedia.caption,
      campaign: newMedia.campaign,
      platform: newMedia.platform,
      date: new Date().toISOString().split("T")[0],
      isFavorite: false,
    };

    setMedia([newItem, ...media]);
    setIsModalOpen(false);
    setNewMedia({ caption: "", description: "", campaign: "", platform: "", type: "image" });
    setErrors({});
  };

  // Filtered media
  const filteredMedia = media.filter((item) => {
    const byCampaign =
      selectedCampaign === "All Campaigns" || item.campaign === selectedCampaign;
    const byPlatform =
      selectedPlatform === "All Platforms" || item.platform === selectedPlatform;

    const itemDate = new Date(item.date);
    const byDate =
      (!startDate || itemDate >= new Date(startDate)) &&
      (!endDate || itemDate <= new Date(endDate));

    return byCampaign && byPlatform && byDate;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Media Library
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Your AI-generated creatives in one place
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow hover:shadow-lg transition-all flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Upload New
        </button>
      </div>

      {/* Filters */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow flex flex-wrap gap-4">
        {/* Campaign */}
        <div className="flex-2 min-w-[200px]">
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            Campaign
          </label>
          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          >
            {campaigns.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Platform */}
        <div className="flex-1 min-w-[180px]">
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            Platform
          </label>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          >
            {platforms.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className="flex-1 min-w-[220px]">
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            Date Range
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <span className="text-slate-400">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col"
          >
            <div className="relative aspect-video rounded-t-xl overflow-hidden bg-slate-200 dark:bg-slate-700">
              <img
                src={item.thumbnail}
                alt={item.caption}
                className="w-full h-full object-cover"
              />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              )}
              <button
                onClick={() => toggleFavorite(item.id)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white dark:bg-slate-800 shadow hover:scale-110 transition-transform"
              >
                <Star
                  className={`w-5 h-5 ${
                    favorites.has(item.id)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-400"
                  }`}
                />
              </button>
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-medium text-slate-900 dark:text-white">
                {item.caption}
              </h3>
              <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
                <span>{item.platform}</span>
                <span className="mx-2">•</span>
                <span>{item.campaign}</span>
              </div>

              {/* Bottom Buttons */}
              <div className="mt-auto flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-700">
                <div className="flex space-x-2">
                  <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400">
                    <Repeat className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex space-x-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
              Upload New Media
            </h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-600 dark:text-slate-300">
                  Caption
                </label>
                <input
                  type="text"
                  value={newMedia.caption}
                  onChange={(e) => setNewMedia({ ...newMedia, caption: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="Enter caption"
                />
                {errors.caption && <p className="text-red-500 text-sm mt-1">{errors.caption}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-slate-600 dark:text-slate-300">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={newMedia.description}
                  onChange={(e) => setNewMedia({ ...newMedia, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-y overflow-y-auto"
                  placeholder="Enter description"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-slate-600 dark:text-slate-300">
                  Campaign
                </label>
                <select
                  value={newMedia.campaign}
                  onChange={(e) => setNewMedia({ ...newMedia, campaign: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="">Select Campaign</option>
                  {campaigns.slice(1).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                {errors.campaign && <p className="text-red-500 text-sm mt-1">{errors.campaign}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-slate-600 dark:text-slate-300">
                  Platform
                </label>
                <select
                  value={newMedia.platform}
                  onChange={(e) => setNewMedia({ ...newMedia, platform: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="">Select Platform</option>
                  {platforms.slice(1).map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
                {errors.platform && <p className="text-red-500 text-sm mt-1">{errors.platform}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
