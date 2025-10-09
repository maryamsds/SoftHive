import { useState } from 'react';
import { motion } from 'framer-motion';

const Welcome = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-auto p-6"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to AI Model
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Let's get your account set up in just a few steps
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mb-8">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Choose your experience</h2>
              <div className="space-y-4">
                <button
                  onClick={() => setStep(2)}
                  className="w-full p-4 text-left border rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="font-medium">Beginner</div>
                  <div className="text-sm text-gray-500">New to AI models</div>
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="w-full p-4 text-left border rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="font-medium">Intermediate</div>
                  <div className="text-sm text-gray-500">Some experience with AI</div>
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="w-full p-4 text-left border rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="font-medium">Advanced</div>
                  <div className="text-sm text-gray-500">Expert in AI models</div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Back
            </button>
          )}
          <div className="flex-1" />
          <button
            onClick={() => step < 4 ? setStep(step + 1) : null}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {step === 4 ? 'Finish' : 'Continue'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;