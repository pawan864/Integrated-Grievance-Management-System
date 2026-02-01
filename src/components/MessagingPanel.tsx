import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, User, Shield, Briefcase, X, Paperclip } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface MessagingPanelProps {
  currentUser: { name: string; email: string; role: 'admin' | 'employee' | 'user' };
  isDarkMode: boolean;
  onClose: () => void;
}

export function MessagingPanel({ currentUser, isDarkMode, onClose }: MessagingPanelProps) {
  const [recipient, setRecipient] = useState<'admin' | 'employee' | 'user' | ''>('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  const recipientOptions = [
    { value: 'admin', label: 'Admin', icon: Shield, color: 'from-red-500 to-orange-500' },
    { value: 'employee', label: 'Employee', icon: Briefcase, color: 'from-purple-500 to-pink-500' },
    { value: 'user', label: 'Resident', icon: User, color: 'from-blue-500 to-cyan-500' }
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient || !subject.trim() || !message.trim()) {
      toast.error('Please fill all fields');
      return;
    }

    toast.success('Message sent successfully!', {
      description: `Your message has been sent to ${recipient}`
    });

    // Reset form
    setRecipient('');
    setSubject('');
    setMessage('');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl rounded-3xl shadow-2xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Send Message
            </h2>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Compose and send a message to society members
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              isDarkMode
                ? 'hover:bg-gray-700 text-gray-400'
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSend} className="p-6 space-y-6">
          {/* Sender Info */}
          <div className={`p-4 rounded-xl border ${
            isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
          }`}>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              From: <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {currentUser.name} ({currentUser.role})
              </span>
            </p>
          </div>

          {/* Recipient Selection */}
          <div>
            <label className={`block text-sm font-medium mb-3 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Send To <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {recipientOptions.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setRecipient(option.value as any)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    recipient === option.value
                      ? `border-transparent bg-gradient-to-br ${option.color} text-white shadow-lg`
                      : isDarkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <option.icon className={`w-6 h-6 mx-auto mb-2 ${
                    recipient === option.value ? 'text-white' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <p className="text-sm font-medium">{option.label}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter message subject"
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                  : 'bg-white border-gray-200 focus:border-blue-500 focus:bg-blue-50/30'
              }`}
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              placeholder="Type your message here..."
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all resize-none ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                  : 'bg-white border-gray-200 focus:border-blue-500 focus:bg-blue-50/30'
              }`}
            />
            <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              {message.length} / 1000 characters
            </p>
          </div>

          {/* Attachment Option */}
          <div>
            <button
              type="button"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed transition-all ${
                isDarkMode
                  ? 'border-gray-600 text-gray-400 hover:border-gray-500 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <Paperclip className="w-4 h-4" />
              <span className="text-sm">Attach File (Optional)</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Send className="w-5 h-5" />
              Send Message
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
