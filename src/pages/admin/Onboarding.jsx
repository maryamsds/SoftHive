import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Youtube,
  Upload,
  Rocket,
  Brain,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  Image as ImageIcon,
  Sparkles,
  Clock,
  LayoutGrid,
  ChevronRight
} from 'lucide-react';

const platforms = [
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-500' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-pink-500' },
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'bg-red-500' },
  { id: 'tiktok', name: 'TikTok', icon: LayoutGrid, color: 'bg-black' }
];

const campaignTypes = [
  { id: 'awareness', name: 'Brand Awareness', description: 'Increase visibility and reach' },
  { id: 'sale', name: 'Sales Promotion', description: 'Drive conversions and sales' },
  { id: 'event', name: 'Event Marketing', description: 'Promote upcoming events' }
];

const aiTips = [
  { title: 'Best Posting Time', description: 'Your audience is most active at 8 PM. Schedule posts accordingly.', icon: Clock },
  { title: 'Content Format', description: 'Carousel ads show 3x better engagement for your industry.', icon: LayoutGrid },
  { title: 'AI Suggestions', description: 'Use AI to generate engaging captions and hashtags.', icon: Sparkles }
];

const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-8">
    <div
      className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
    />
  </div>
);

const PlatformCard = ({ platform, isConnected, onToggle }) => {
  const Icon = platform.icon;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-pointer">
      <div className={`${platform.color} p-4 rounded-full text-white mb-4`}>
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{platform.name}</h3>
      <button
        onClick={() => onToggle(platform.id)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isConnected
            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200'
            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200'
        }`}
      >
        {isConnected ? (
          <>
            <X size={16} />
            Disconnect
          </>
        ) : (
          <>
            <Check size={16} />
            Connect
          </>
        )}
      </button>
    </div>
  );
};

const Step1_Platforms = ({ connectedPlatforms, onTogglePlatform, onNext }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {platforms.map((platform) => (
        <PlatformCard
          key={platform.id}
          platform={platform}
          isConnected={connectedPlatforms.includes(platform.id)}
          onToggle={onTogglePlatform}
        />
      ))}
    </div>
    <div className="flex justify-end">
      <button
        onClick={onNext}
        disabled={connectedPlatforms.length === 0}
        className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
          connectedPlatforms.length === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
        }`}
      >
        Continue
        <ArrowRight size={20} />
      </button>
    </div>
  </div>
);

const Step2_Product = ({ product, onProductChange, onNext, onBack }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      onProductChange('image', file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateTitle = (value) => /^[A-Za-z\s]+$/.test(value); // Only letters
  const validateDescription = (value) =>
    !/(javascript|<script>|<[^>]+>|html)/i.test(value); // no HTML/JS words

  const isValid =
    validateTitle(product.title.trim()) &&
    validateDescription(product.description.trim()) &&
    product.price !== '' &&
    product.image;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="space-y-4">
          {/* Product Title */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product Title
            </label>
            <input
              type="text"
              value={product.title}
              onChange={(e) =>
                validateTitle(e.target.value) && onProductChange('title', e.target.value)
              }
              className="w-full h-11 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter product title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={product.description}
              onChange={(e) =>
                validateDescription(e.target.value) &&
                onProductChange('description', e.target.value)
              }
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none overflow-y-auto"
              placeholder="Describe your product"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price
            </label>
            <input
              type="number"
              value={product.price}
              onChange={(e) => onProductChange('price', e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="0.00"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product Image
            </label>
            <div className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <label className="relative cursor-pointer rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e.target.files[0])}
                  />
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-4 rounded-lg w-32 h-32 object-cover mx-auto border"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
            !isValid
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
          }`}
        >
          Continue
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

const Step3_Campaign = ({ campaign, onCampaignChange, onNext, onBack }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {campaignTypes.map((type) => (
        <div
          key={type.id}
          onClick={() => onCampaignChange('type', type.id)}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 cursor-pointer transition-all ${
            campaign.type === type.id
              ? 'ring-2 ring-blue-500 transform scale-105'
              : 'hover:scale-105'
          }`}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {type.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {type.description}
          </p>
        </div>
      ))}
    </div>

    {campaign.type && (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          AI-Generated Preview
        </h3>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-gray-600 dark:text-gray-300">
            🌟 Introducing our latest collection! Discover amazing products that will transform your experience.
            #Innovation #Quality #NewArrivals
          </p>
        </div>
      </div>
    )}

    <div className="flex justify-between">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white"
      >
        <ArrowLeft size={20} />
        Back
      </button>
      <button
        onClick={onNext}
        disabled={!campaign.type}
        className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
          !campaign.type
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
        }`}
      >
        Continue
        <ArrowRight size={20} />
      </button>
    </div>
  </div>
);

const Step4_AITips = ({ onComplete, onBack }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {aiTips.map((tip, index) => {
        const Icon = tip.icon;
        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-transform hover:scale-105"
          >
            <Icon className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {tip.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {tip.description}
            </p>
          </div>
        );
      })}
    </div>
    <div className="flex justify-between">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white"
      >
        <ArrowLeft size={20} />
        Back
      </button>
      <button
        onClick={onComplete}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
      >
        Finish Setup
        <Check size={20} />
      </button>
    </div>
  </div>
);

const CompletionScreen = ({ onGoToDashboard }) => (
  <div className="text-center py-12">
    <div className="animate-bounce mb-8">🎉</div>
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">You're all set!</h2>
    <p className="text-gray-600 dark:text-gray-300 mb-8">
      Your account is now configured and ready to create amazing campaigns.
    </p>
    <button
      onClick={onGoToDashboard}
      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
    >
      Go to Dashboard
      <ChevronRight size={20} />
    </button>
  </div>
);

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [connectedPlatforms, setConnectedPlatforms] = useState([]);
  const [product, setProduct] = useState({ title: '', description: '', price: '', image: null });
  const [campaign, setCampaign] = useState({ type: null });

  const totalSteps = 4;

  const handleTogglePlatform = (platformId) => {
    setConnectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId]
    );
  };

  const handleProductChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleCampaignChange = (field, value) => {
    setCampaign((prev) => ({ ...prev, [field]: value }));
  };

  const handleComplete = () => {
    navigate('/admin/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1_Platforms
            connectedPlatforms={connectedPlatforms}
            onTogglePlatform={handleTogglePlatform}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <Step2_Product
            product={product}
            onProductChange={handleProductChange}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <Step3_Campaign
            campaign={campaign}
            onCampaignChange={handleCampaignChange}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        );
      case 4:
        return <Step4_AITips onComplete={() => setCurrentStep(5)} onBack={() => setCurrentStep(3)} />;
      case 5:
        return <CompletionScreen onGoToDashboard={handleComplete} />;
      default:
        return null;
    }
  };

  const stepTitles = [
    'Connect Your Platforms',
    'Add Your First Product',
    'Create Your First Campaign',
    'AI-Powered Insights',
    'Setup Complete!'
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {currentStep <= totalSteps && (
        <>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to [AppName] 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Let's get your account set up in a few quick steps.
            </p>
          </div>

          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Step {currentStep}: {stepTitles[currentStep - 1]}
            </h2>
          </div>
        </>
      )}
      {renderStep()}
    </div>
  );
};

export default Onboarding;
