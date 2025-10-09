import { motion } from 'framer-motion';

const Preferences = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-auto p-6"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Preferences
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Customize your AI model experience
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
          {/* Theme Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Theme Preference
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button className="p-4 border rounded-lg hover:border-blue-500 text-center">
                Light
              </button>
              <button className="p-4 border rounded-lg hover:border-blue-500 text-center">
                Dark
              </button>
              <button className="p-4 border rounded-lg hover:border-blue-500 text-center">
                System
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Notifications
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Email notifications
                </span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Browser notifications
                </span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Weekly summary
                </span>
              </label>
            </div>
          </div>

          {/* Language Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <select className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Japanese</option>
            </select>
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

export default Preferences;