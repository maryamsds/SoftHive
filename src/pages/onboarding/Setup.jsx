import { motion } from 'framer-motion';

const Setup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-auto p-6"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Model Setup
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Configure your AI model preferences
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
          {/* Model Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Base Model
            </label>
            <select className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
              <option>GPT-4</option>
              <option>GPT-3.5 Turbo</option>
              <option>Claude 2</option>
              <option>Custom Model</option>
            </select>
          </div>

          {/* Parameters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Model Parameters
            </label>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Temperature</label>
                <input type="range" className="w-full" min="0" max="1" step="0.1" />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Max Tokens</label>
                <input type="range" className="w-full" min="100" max="4000" step="100" />
              </div>
            </div>
          </div>

          {/* API Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              API Key
            </label>
            <input 
              type="password" 
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter your API key"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          <button className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Back
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Continue
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Setup;