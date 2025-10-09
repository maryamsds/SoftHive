import { useState } from "react";
import {
  FileSpreadsheet,
  FileText,
  Download,
  Trash2,
  Calendar,
  FileDown,
  Share2,
  Clock,
  AlertTriangle,
  BarChart,
  DollarSign,
  Users,
  Mail,
  Filter,
  FileSignature,
  Layers,
} from "lucide-react";

const reportTypes = [
  { id: "campaign", label: "Campaign Performance", icon: BarChart },
  { id: "analytics", label: "Analytics Overview", icon: FileSpreadsheet },
  { id: "billing", label: "Billing & Invoices", icon: DollarSign },
  { id: "user-activity", label: "User Activity", icon: Users },
];

const formats = [
  { id: "csv", label: "CSV", icon: FileText },
  { id: "excel", label: "Excel", icon: FileSpreadsheet },
  { id: "pdf", label: "PDF", icon: FileText },
];

const initialReports = [
  {
    id: 1,
    name: "Campaign Report - Sep 2025",
    type: "campaign",
    dateRange: "2025-09-01 to 2025-09-30",
    generatedOn: "2025-10-01T10:30:00",
    format: "excel",
    status: "completed",
  },
  {
    id: 2,
    name: "Billing Summary Q3 2025",
    type: "billing",
    dateRange: "2025-07-01 to 2025-09-30",
    generatedOn: "2025-10-01T09:45:00",
    format: "pdf",
    status: "completed",
  },
  {
    id: 3,
    name: "User Activity Report",
    type: "user-activity",
    dateRange: "2025-09-15 to 2025-09-30",
    generatedOn: "2025-09-30T16:20:00",
    format: "csv",
    status: "completed",
  },
];

const inputBaseClasses =
  "h-11 pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const selectBaseClasses =
  "h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const FilterPanel = ({ filters, onFilterChange, onGenerate, onSchedule }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
    <div className="flex items-center gap-2 mb-4">
      <Filter className="h-5 w-5 text-blue-600" />
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Report Filters
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Report Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
          <Layers className="h-4 w-4 text-gray-500" />
          Report Type
        </label>
        <select
          value={filters.type}
          onChange={(e) => onFilterChange("type", e.target.value)}
          className={selectBaseClasses}
        >
          <option value="">Select Type</option>
          {reportTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range - Start */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
          <Calendar className="h-4 w-4 text-gray-500" />
          Start Date
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => onFilterChange("startDate", e.target.value)}
            className={inputBaseClasses}
          />
        </div>
      </div>

      {/* Date Range - End */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
          <Calendar className="h-4 w-4 text-gray-500" />
          End Date
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => onFilterChange("endDate", e.target.value)}
            className={inputBaseClasses}
          />
        </div>
      </div>

      {/* Format */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
          <FileSignature className="h-4 w-4 text-gray-500" />
          Format
        </label>
        <select
          value={filters.format}
          onChange={(e) => onFilterChange("format", e.target.value)}
          className={selectBaseClasses}
        >
          <option value="">Select Format</option>
          {formats.map((format) => (
            <option key={format.id} value={format.id}>
              {format.label}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="mt-6 flex items-center justify-between">
      <button
        onClick={onGenerate}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <FileDown className="h-5 w-5" />
        Generate Report
      </button>

      <button
        onClick={onSchedule}
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center gap-2"
      >
        <Clock className="h-5 w-5" />
        Schedule Report
      </button>
    </div>
  </div>
);

const ReportTable = ({ reports, onDownload, onDelete, onShare }) => (
  <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
    {/* Desktop View */}
    <div className="hidden md:block">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" /> Report Name
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center gap-1">
                <Layers className="h-4 w-4" /> Type
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Date Range
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> Generated On
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center gap-1">
                <FileSpreadsheet className="h-4 w-4" /> Format
              </div>
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {reports.map((report, index) => (
            <tr
              key={report.id}
              className={`${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-gray-800"
                  : "bg-white dark:bg-gray-900"
              } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                {report.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                {report.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                {report.dateRange}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                {new Date(report.generatedOn).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                {report.format.toUpperCase()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => onDownload(report)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                    title="Download"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onShare(report)}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                    title="Share"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(report)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile View */}
    <div className="md:hidden space-y-4 p-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-3"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-1">
                <FileText className="h-4 w-4" />
                {report.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                <Layers className="h-3 w-3" /> {report.type} •{" "}
                {report.format.toUpperCase()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onDownload(report)}
                className="text-blue-600 dark:text-blue-400"
              >
                <Download className="h-5 w-5" />
              </button>
              <button
                onClick={() => onShare(report)}
                className="text-gray-600 dark:text-gray-400"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(report)}
                className="text-red-600 dark:text-red-400"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300">
            <p>
              <Calendar className="h-3 w-3 inline mr-1" />
              Date Range: {report.dateRange}
            </p>
            <p>
              <Clock className="h-3 w-3 inline mr-1" />
              Generated: {new Date(report.generatedOn).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Reports = () => {
  const [reports, setReports] = useState(initialReports);
  const [filters, setFilters] = useState({
    type: "",
    startDate: "",
    endDate: "",
    format: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerate = () => {
    if (!filters.type || !filters.startDate || !filters.endDate || !filters.format) {
      alert("Please fill all filters before generating a report!");
      return;
    }

    const newReport = {
      id: reports.length + 1,
      name: `${filters.type} Report - ${filters.startDate} to ${filters.endDate}`,
      type: filters.type,
      dateRange: `${filters.startDate} to ${filters.endDate}`,
      generatedOn: new Date().toISOString(),
      format: filters.format,
      status: "completed",
    };

    setReports([newReport, ...reports]);
    alert("Report generated successfully!");
  };

  const handleSchedule = () => {
    alert("Report scheduling feature will send email reminders soon!");
  };

  const handleDownload = (report) => {
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${report.name}.${report.format}`;
    link.click();
  };

  const handleDelete = (report) => {
    setReports(reports.filter((r) => r.id !== report.id));
  };

  const handleShare = (report) => {
    alert(`Sharing ${report.name} via email...`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <BarChart className="h-7 w-7 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Reports
        </h1>
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-300 flex items-center gap-1">
        <Mail className="h-4 w-4" /> Generate and download system reports for
        campaigns, billing, and user activity.
      </p>

      {/* Future Features Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 p-4">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-blue-400 mr-2" />
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Coming soon: Automated report scheduling and email delivery
          </p>
        </div>
      </div>

      {/* Filters */}
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onGenerate={handleGenerate}
        onSchedule={handleSchedule}
      />

      {/* Reports Table */}
      <ReportTable
        reports={reports}
        onDownload={handleDownload}
        onDelete={handleDelete}
        onShare={handleShare}
      />
    </div>
  );
};

export default Reports;
