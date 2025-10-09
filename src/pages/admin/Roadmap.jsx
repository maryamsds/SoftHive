import { Calendar } from "lucide-react";
import {
  RoadmapColumn,
  ChangelogEntry,
} from "../../components/roadmap/RoadmapComponents";

const roadmapData = {
  planned: [
    {
      title: "AI-powered captions",
      description:
        "Automatically generate engaging captions for your content using advanced AI.",
      eta: "Q4 2025",
    },
    {
      title: "Social Media Integration",
      description:
        "Connect and manage all your social media accounts in one place.",
      eta: "Q1 2026",
    },
    {
      title: "Custom Report Builder",
      description:
        "Create and schedule custom reports with your preferred metrics.",
      eta: "Q4 2025",
    },
  ],
  inProgress: [
    {
      title: "Advanced Analytics Dashboard",
      description:
        "Comprehensive analytics with advanced filtering and visualization options.",
      eta: "Oct 2025",
    },
    {
      title: "Team Collaboration",
      description:
        "Work together with your team, assign tasks, and track progress.",
      eta: "Nov 2025",
    },
  ],
  released: [
    {
      title: "Bulk Product Upload",
      description:
        "Upload and manage multiple products at once with Excel import.",
      eta: null,
    },
    {
      title: "Campaign Templates",
      description: "Ready-to-use templates for various campaign types.",
      eta: null,
    },
  ],
};

const changelogData = [
  {
    type: "New",
    title: "Added Audit Logs for Enterprise",
    description: "Track all system activities with detailed audit logs.",
    date: "Sept 2025",
  },
  {
    type: "Improved",
    title: "Campaign Performance Charts",
    description:
      "Optimized chart rendering for faster load times and better interactivity.",
    date: "Aug 2025",
  },
  {
    type: "Fixed",
    title: "Login Redirect Issue",
    description:
      "Resolved an issue where users were incorrectly redirected after login.",
    date: "Aug 2025",
  },
  {
    type: "New",
    title: "Multi-language Support",
    description: "Added support for 10 new languages.",
    date: "July 2025",
  },
];

const Roadmap = () => {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30">
          <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Product Roadmap & Changelog
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">
            Stay updated on planned, in-progress, and released features.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Roadmap Board */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Feature Roadmap
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <RoadmapColumn
              title="Planned"
              items={roadmapData.planned}
              bgColor="bg-gray-50 dark:bg-gray-800/50"
            />
            <RoadmapColumn
              title="In Progress"
              items={roadmapData.inProgress}
              bgColor="bg-blue-50 dark:bg-blue-900/20"
            />
            <RoadmapColumn
              title="Released"
              items={roadmapData.released}
              bgColor="bg-green-50 dark:bg-green-900/20"
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            * Features and dates are subject to change based on development
            progress.
          </p>
        </div>

        {/* Changelog */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Changelog
          </h2>
          <div className="space-y-4">
            {changelogData.map((entry, index) => (
              <ChangelogEntry key={index} entry={entry} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-5">
        Last Updated: October 1, 2025
      </div>
    </div>
  );
};

export default Roadmap;
