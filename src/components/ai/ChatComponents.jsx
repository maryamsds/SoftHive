import { motion } from 'framer-motion';

export const ChatMessage = ({ message, isAI }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}
  >
    <div
      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
        isAI
          ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
          : 'bg-blue-600 text-white'
      }`}
    >
      <p className="text-base">{message}</p>
    </div>
  </motion.div>
);

export const QuickPromptCard = ({ title, description, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="w-full p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
  >
    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
      {title}
    </h3>
    <p className="text-xs text-gray-500 dark:text-gray-400">
      {description}
    </p>
  </motion.button>
);