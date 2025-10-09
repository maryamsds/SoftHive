import { motion } from 'framer-motion';

export const RoadmapCard = ({ item }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all p-4 cursor-move"
  >
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
      {item.title}
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
      {item.description}
    </p>
    {item.eta && (
      <div className="text-xs text-gray-500 dark:text-gray-400">
        ETA: {item.eta}
      </div>
    )}
  </motion.div>
);

export const RoadmapColumn = ({ title, items, bgColor }) => (
  <div className={`${bgColor} rounded-xl p-4 min-h-[400px]`}>
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      {title}
    </h2>
    <div className="space-y-3">
      {items.map((item, index) => (
        <RoadmapCard key={index} item={item} />
      ))}
    </div>
  </div>
);

export const ChangelogEntry = ({ entry, delay = 0 }) => {
  const getBadgeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'new':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'improved':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'fixed':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="flex gap-4 pb-6"
    >
      <div className="w-24 pt-1 text-sm text-gray-500 dark:text-gray-400 shrink-0">
        {entry.date}
      </div>
      <div>
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${getBadgeColor(entry.type)}`}>
          {entry.type}
        </span>
        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">
          {entry.title}
        </h3>
        {entry.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {entry.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};