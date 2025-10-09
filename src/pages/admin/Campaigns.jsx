import React, { useState } from 'react';

// Sample data
const initialCampaigns = [
  {
    id: 1,
    name: 'Summer Collection',
    platforms: ['FB', 'Insta'],
    status: 'Live',
    performance: { ctr: '4.2%', roi: '320%' },
  },
  {
    id: 2,
    name: 'Holiday Special',
    platforms: ['FB', 'TikTok', 'YT'],
    status: 'Draft',
    performance: { ctr: '3.8%', roi: '280%' },
  },
  {
    id: 3,
    name: 'Winter Launch',
    platforms: ['Insta', 'YT'],
    status: 'Live',
    performance: { ctr: '5.1%', roi: '350%' },
  },
];

const platforms = ['FB', 'Insta', 'TikTok', 'YT'];

const CampaignWizard = ({ onClose, onSave, editingCampaign }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(
    editingCampaign || {
      title: '',
      description: '',
      price: '',
      image: null,
      platforms: [],
      schedule: { date: '', time: '' },
    }
  );

  const steps = ['Product Info', 'Platforms', 'AI Suggestions', 'Preview', 'Schedule'];

  const handleNext = () => {
    if (isStepValid()) setStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const isStepValid = () => {
    if (step === 1) {
      const isTextValid =
        typeof formData.title === 'string' &&
        formData.title.trim() !== '' &&
        typeof formData.description === 'string' &&
        formData.description.trim() !== '';
      const priceNumber = parseFloat(formData.price);
      const isPriceValid = !isNaN(priceNumber) && priceNumber > 0;
      const isImageValid = formData.image !== null;
      return isTextValid && isPriceValid && isImageValid;
    } else if (step === 2) {
      return formData.platforms.length > 0;
    } else if (step === 5) {
      return formData.schedule.date !== '' && formData.schedule.time !== '';
    }
    return true;
  };

  const handlePublish = () => {
    onSave({
      id: editingCampaign ? editingCampaign.id : Date.now(),
      name: formData.title,
      platforms: formData.platforms,
      status: 'Live',
      performance: { ctr: '0%', roi: '0%' },
    });
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Campaign Title</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-blue-500"
                placeholder="Enter campaign title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              {step === 1 && !formData.title.trim() && (
                <p className="text-xs text-red-500 mt-1">Campaign Title is required.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Enter campaign description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {step === 1 && !formData.description.trim() && (
                <p className="text-xs text-red-500 mt-1">Description is required.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                step="0.01"
                className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-blue-500"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
              {step === 1 &&
                (formData.price.trim() === '' || parseFloat(formData.price) <= 0) && (
                  <p className="text-xs text-red-500 mt-1">
                    Price must be a positive number.
                  </p>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
              />
              {formData.image && (
                <p className="text-sm text-green-600 mt-2">{formData.image.name}</p>
              )}
              {step === 1 && formData.image === null && (
                <p className="text-xs text-red-500 mt-1">Product Image is required.</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">Select Platforms</h3>
            <div className="grid grid-cols-2 gap-4">
              {platforms.map((platform) => (
                <label
                  key={platform}
                  className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.platforms.includes(platform)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={formData.platforms.includes(platform)}
                    onChange={() => {
                      const newPlatforms = formData.platforms.includes(platform)
                        ? formData.platforms.filter((p) => p !== platform)
                        : [...formData.platforms, platform];
                      setFormData({ ...formData, platforms: newPlatforms });
                    }}
                  />
                  <span className="text-sm font-medium">{platform}</span>
                </label>
              ))}
            </div>
            {step === 2 && formData.platforms.length === 0 && (
              <p className="text-xs text-red-500 mt-1">
                Please select at least one platform.
              </p>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border bg-gradient-to-br from-purple-500/10 to-blue-500/10">
              <h3 className="text-lg font-medium mb-4">AI-Generated Suggestions</h3>
              <p className="italic text-slate-600">
                "Experience summer like never before 🌞 Style and comfort together!"
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium mb-4">Preview Your Ads</h3>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-none w-64">
                  <div className="aspect-[4/5] rounded-lg bg-slate-100 mb-2"></div>
                  <p className="text-sm text-slate-600">Ad Variation {i}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium mb-4">Schedule Campaign</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  value={formData.schedule.date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      schedule: { ...formData.schedule, date: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 rounded-xl border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Start Time</label>
                <input
                  type="time"
                  value={formData.schedule.time}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      schedule: { ...formData.schedule, time: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 rounded-xl border"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-red-500"
        >
          ✕
        </button>

        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((s, i) => (
                <div key={s} className="flex-1 text-center">
                  <div
                    className={`inline-block w-8 h-8 rounded-full ${
                      step > i + 1
                        ? 'bg-blue-500'
                        : step === i + 1
                        ? 'bg-blue-500'
                        : 'bg-slate-200'
                    } text-white flex items-center justify-center`}
                  >
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          {renderStep()}

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={handleBack}
              className={`px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 ${
                step === 1 ? 'invisible' : ''
              }`}
            >
              Back
            </button>
            <button
              onClick={step === 5 ? handlePublish : handleNext}
              disabled={!isStepValid()}
              className={`px-6 py-2 rounded-lg text-white ${
                isStepValid()
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-slate-400 cursor-not-allowed'
              }`}
            >
              {step === 5 ? (editingCampaign ? 'Update' : 'Publish') : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [showWizard, setShowWizard] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('All');

  const filteredCampaigns =
    selectedPlatform === 'All'
      ? campaigns
      : campaigns.filter((c) => c.platforms.includes(selectedPlatform));

  const handleSave = (newCampaign) => {
    if (editingCampaign) {
      setCampaigns((prev) =>
        prev.map((c) => (c.id === newCampaign.id ? newCampaign : c))
      );
    } else {
      setCampaigns((prev) => [...prev, newCampaign]);
    }
    setEditingCampaign(null);
  };

  const handleDuplicate = (id) => {
    const campaignToDuplicate = campaigns.find((c) => c.id === id);
    if (campaignToDuplicate) {
      const newCampaign = { ...campaignToDuplicate, id: Date.now(), name: campaignToDuplicate.name + ' (Copy)' };
      setCampaigns([...campaigns, newCampaign]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Campaigns</h1>
        <button
          onClick={() => {
            setEditingCampaign(null);
            setShowWizard(true);
          }}
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          ➕ New Campaign
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="px-4 py-2 rounded-lg border bg-white text-slate-700"
        >
          <option value="All">All Platforms</option>
          {platforms.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
          <thead className="bg-slate-100 dark:bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-200 uppercase tracking-wider">S.No</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-200 uppercase tracking-wider">Campaign Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-200 uppercase tracking-wider">Platforms</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-200 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-200 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-200 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCampaigns.map((c, index) => (
              <tr key={c.id} className="border-t hover:bg-slate-700 dark:hover:bg-slate-600">
                <td className="px-6 py-4 text-sm">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium">{c.name}</td>
                <td className="px-6 py-4 text-sm">
                  {c.platforms.map((p) => (
                    <span key={p} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mr-1">
                      {p}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      c.status === 'Live'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  CTR: {c.performance.ctr} • ROI: {c.performance.roi}
                </td>
                <td className="px-6 py-4 text-sm text-right space-x-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                    onClick={() => {
                      setEditingCampaign(c);
                      setShowWizard(true);
                    }}
                  >
                    ✎
                  </button>
                  <button
                    className="text-purple-600 hover:text-purple-800"
                    title="Duplicate"
                    onClick={() => handleDuplicate(c.id)}
                  >
                    ⧉
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                    onClick={() => handleDelete(c.id)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
            {filteredCampaigns.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-slate-500 py-6">
                  No campaigns found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Wizard Modal */}
      {showWizard && (
        <CampaignWizard
          onClose={() => setShowWizard(false)}
          onSave={handleSave}
          editingCampaign={editingCampaign}
        />
      )}
    </div>
  );
};

export default Campaigns;
