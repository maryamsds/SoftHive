import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Send,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  BarChart2,
  Rocket
} from 'lucide-react';
import { ChatMessage, QuickPromptCard } from '../../components/ai/ChatComponents';

const quickPrompts = [
  {
    title: 'Suggest captions',
    description: 'Get AI-generated caption ideas for your content',
    icon: Sparkles
  },
  {
    title: 'Analyze campaign',
    description: 'Get insights and improvement suggestions',
    icon: BarChart2
  },
  {
    title: 'Improve engagement',
    description: 'Tips to boost your content performance',
    icon: Rocket
  }
];

const initialMessages = [
  {
    id: 1,
    content: "Hi! How can I help you today?",
    isAI: true
  },
  {
    id: 2,
    content: "Suggest me 5 captions for Product X",
    isAI: false
  },
  {
    id: 3,
    content: "Here are 5 caption ideas for Product X:\n\n1. \"Transform your daily routine with Product X 🌟\"\n2. \"Innovation meets simplicity - discover Product X today!\"\n3. \"The smart choice for modern living ✨\"\n4. \"Elevate your experience with Product X 🚀\"\n5. \"Quality meets innovation - Product X\"",
    isAI: true
  }
];

const AIAssistant = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isPromptsPanelOpen, setIsPromptsPanelOpen] = useState(true);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      content: inputMessage,
      isAI: false
    }]);
    
    setInputMessage('');
  };

  const handleQuickPrompt = (prompt) => {
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      content: prompt.title,
      isAI: false
    }]);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Bot className="w-8 h-8 text-blue-600 mr-3" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            AI Assistant
            <span className="text-sm font-normal px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
              Future
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Get AI-powered guidance for your campaigns and products.
          </p>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Chat Section */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.content}
                isAI={message.isAI}
              />
            ))}
          </div>

          {/* Input Form */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()} // ✅ Disable if empty
                className={`p-2 rounded-lg flex items-center justify-center transition-colors 
                  ${!inputMessage.trim()
                    ? "bg-gray-300 dark:bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                <Send className="w-5 h-5" /> {/* ✅ Icon center aligned */}
              </button>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              This is a prototype. AI responses will be integrated later.
            </p>
          </div>
        </div>

        {/* Quick Prompts Panel */}
        <motion.div
          initial={false}
          animate={{ width: isPromptsPanelOpen ? 300 : 40 }}
          className="bg-gray-50 dark:bg-gray-800/50 rounded-xl shadow-sm relative"
        >
          <button
            onClick={() => setIsPromptsPanelOpen(!isPromptsPanelOpen)}
            className="absolute -left-3 top-4 bg-white dark:bg-gray-800 shadow-md rounded-full p-1.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            {isPromptsPanelOpen ? <ChevronRight /> : <ChevronLeft />}
          </button>

          {isPromptsPanelOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 h-full"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 ml-6">
                Quick Prompts
              </h2>
              <div className="space-y-3">
                {quickPrompts.map((prompt, index) => (
                  <QuickPromptCard
                    key={index}
                    title={prompt.title}
                    description={prompt.description}
                    onClick={() => handleQuickPrompt(prompt)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AIAssistant;
