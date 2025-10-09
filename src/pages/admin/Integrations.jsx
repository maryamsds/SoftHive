import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  ShoppingBag,
  Store,
  ShoppingCart,
  AlertCircle,
  Check,
  X,
  ExternalLink,
} from "lucide-react";

// Initial platforms data
const initialPlatforms = {
  social: [
    {
      id: "facebook",
      name: "Facebook",
      icon: Facebook,
      status: "connected",
      expiry: null,
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      status: "connected",
      expiry: "2025-10-15",
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.041.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.48A6.37 6.37 0 0 0 15.66 16v-7.18a7.8 7.8 0 0 0 3.93 1.1V6.69z" />
        </svg>
      ),
      status: "disconnected",
      expiry: null,
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: Youtube,
      status: "expired",
      expiry: "2025-09-30",
    },
  ],
  ecommerce: [
    {
      id: "shopify",
      name: "Shopify",
      icon: ShoppingBag,
      status: "connected",
      expiry: null,
    },
    {
      id: "woocommerce",
      name: "WooCommerce",
      icon: Store,
      status: "disconnected",
      expiry: null,
    },
    {
      id: "amazon",
      name: "Amazon",
      icon: ShoppingCart,
      status: "disconnected",
      expiry: null,
    },
  ],
  ads: [
    {
      id: "meta-ads",
      name: "Meta Ads",
      icon: Facebook,
      status: "connected",
      expiry: null,
    },
    {
      id: "google-ads",
      name: "Google Ads",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.18 10.382L13.055 23h-2.89l3.338-5.068-6.237-7.55H10.5l4.23 5.215 3.534-5.215h2.89l-3.338 5.068 4.364 5.318z" />
        </svg>
      ),
      status: "disconnected",
      expiry: null,
    },
  ],
};

const IntegrationCard = ({ platform, onToggle }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "disconnected":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "expired":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "";
    }
  };

  const Icon = platform.icon;

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
      {/* Top Content */}
      <div className="flex items-start space-x-4">
        <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {platform.name}
          </h3>
          <div className="mt-1 flex items-center space-x-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                platform.status
              )}`}
            >
              {platform.status === "connected" && (
                <Check className="w-3 h-3 mr-1" />
              )}
              {platform.status === "disconnected" && (
                <X className="w-3 h-3 mr-1" />
              )}
              {platform.status === "expired" && (
                <AlertCircle className="w-3 h-3 mr-1" />
              )}
              {platform.status.charAt(0).toUpperCase() +
                platform.status.slice(1)}
            </span>
            {platform.expiry && platform.status === "expired" && (
              <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                Token expired
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="mt-6">
        <button
          onClick={() => onToggle(platform.id)}
          className={`w-full px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm font-medium transition-all ${
            platform.status === "connected"
              ? "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
          }`}
        >
          <ExternalLink className="w-4 h-4" />
          <span>
            {platform.status === "connected" ? "Disconnect" : "Connect"}
          </span>
        </button>
      </div>
    </div>
  );
};

const Integrations = () => {
  const [platforms, setPlatforms] = useState(initialPlatforms);

  // ✅ Fixed Toggle (immutability safe)
  const handleToggle = (platformId) => {
    setPlatforms((prev) => {
      const newPlatforms = {};

      for (const category in prev) {
        newPlatforms[category] = prev[category].map((platform) =>
          platform.id === platformId
            ? {
                ...platform,
                status:
                  platform.status === "connected"
                    ? "disconnected"
                    : "connected",
              }
            : platform
        );
      }

      return newPlatforms;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-6 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          🔗 Integrations
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Manage and connect your favorite platforms with ease.
        </p>
      </div>

      {/* Social Platforms */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          🌐 Social Platforms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {platforms.social.map((platform) => (
            <IntegrationCard
              key={platform.id}
              platform={platform}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>

      {/* E-commerce Platforms */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          🛒 E-commerce Platforms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {platforms.ecommerce.map((platform) => (
            <IntegrationCard
              key={platform.id}
              platform={platform}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>

      {/* Ad Accounts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          📢 Ad Accounts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {platforms.ads.map((platform) => (
            <IntegrationCard
              key={platform.id}
              platform={platform}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Integrations;
