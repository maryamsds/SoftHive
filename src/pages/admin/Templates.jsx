import { useState } from 'react';
import {
  Layout,
  Image,
  Edit,
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';

const categories = [
  { id: 'product-launch', label: 'Product Launch' },
  { id: 'sale-discount', label: 'Sale / Discount' },
  { id: 'brand-awareness', label: 'Brand Awareness' },
  { id: 'seasonal-event', label: 'Seasonal / Event' },
  { id: 'custom', label: 'Custom', disabled: true }
];

const templates = [
  {
    id: 1,
    title: '50% OFF Summer Sale',
    description: 'Drive sales with this eye-catching summer discount template.',
    category: 'sale-discount',
    thumbnail: '/templates/summer-sale.jpg',
    preview: {
      caption: 'Beat the heat with our biggest summer sale! 🌞 Get 50% off on all summer essentials.',
      hashtags: ['#SummerSale', '#ShopNow', '#Discount'],
      creativeType: 'Carousel'
    }
  },
  {
    id: 2,
    title: 'New Product Launch',
    description: 'Announce your new product with style and impact.',
    category: 'product-launch',
    thumbnail: '/templates/product-launch.jpg',
    preview: {
      caption: 'Introducing our latest innovation! 🚀 Be the first to experience the future.',
      hashtags: ['#NewProduct', '#Innovation', '#Launch'],
      creativeType: 'Single Image'
    }
  },
  {
    id: 3,
    title: 'Brand Story',
    description: 'Share your brand\'s journey and connect with your audience.',
    category: 'brand-awareness',
    thumbnail: '/templates/brand-story.jpg',
    preview: {
      caption: 'Our journey began with a simple idea. Today, we\'re transforming the industry.',
      hashtags: ['#BrandStory', '#Journey', '#Innovation'],
      creativeType: 'Video'
    }
  },
  {
    id: 4,
    title: 'Holiday Special',
    description: 'Perfect for seasonal promotions and holiday campaigns.',
    category: 'seasonal-event',
    thumbnail: '/templates/holiday.jpg',
    preview: {
      caption: 'Celebrate the season with special offers on all your favorites! 🎉',
      hashtags: ['#HolidaySale', '#Celebrate', '#SpecialOffer'],
      creativeType: 'Multi-image'
    }
  }
];

const TemplateCard = ({ template, onUse }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">
    <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
      <Image className="w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400" />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{template.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{template.description}</p>
      <button
        onClick={() => onUse(template)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        Use Template
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const PreviewModal = ({ template, onClose, onApply, onCustomize }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{template.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Preview</h3>
            <div className="h-64 bg-gray-200 dark:bg-gray-600 rounded-lg mb-4 flex items-center justify-center">
              <Layout className="w-12 h-12 text-gray-400" />
            </div>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">{template.preview.caption}</p>
              <div className="flex flex-wrap gap-2">
                {template.preview.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="text-blue-600 dark:text-blue-400 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onApply(template)}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply to My Campaign
            </button>
            <button
              onClick={() => onCustomize(template)}
              className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Customize
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('product-launch');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(true);

  const filteredTemplates = templates.filter(
    template => selectedCategory === 'all' || template.category === selectedCategory
  );

  const handleUseTemplate = (template) => {
    setSelectedTemplate(template);
  };

  const handleApplyTemplate = (template) => {
    console.log('Applying template:', template);
    setSelectedTemplate(null);
  };

  const handleCustomizeTemplate = (template) => {
    console.log('Customizing template:', template);
    setSelectedTemplate(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Templates Hub</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Choose from pre-made templates for your campaigns.
        </p>
      </div>

      {/* Category Filters */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              disabled={category.disabled}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              } ${
                category.disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-600'
              } transition-colors`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      {showRecommendations && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">AI Recommendation</h3>
                <p className="text-blue-100">Best for your product: Carousel Ad Template</p>
              </div>
            </div>
            <button
              onClick={() => setShowRecommendations(false)}
              className="text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onUse={handleUseTemplate}
          />
        ))}
      </div>

      {/* Preview Modal */}
      {selectedTemplate && (
        <PreviewModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
          onApply={handleApplyTemplate}
          onCustomize={handleCustomizeTemplate}
        />
      )}
    </div>
  );
};

export default Templates;