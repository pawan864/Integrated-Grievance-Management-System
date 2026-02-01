import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Send, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface FeedbackFormProps {
  grievanceId: string;
  grievanceTitle: string;
  isDarkMode: boolean;
  onClose: () => void;
}

export function FeedbackForm({ grievanceId, grievanceTitle, isDarkMode, onClose }: FeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [satisfaction, setSatisfaction] = useState<'satisfied' | 'dissatisfied' | ''>('');
  const [feedback, setFeedback] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error('Please provide a rating');
      return;
    }

    if (!satisfaction) {
      toast.error('Please select your satisfaction level');
      return;
    }

    toast.success('Feedback submitted successfully!', {
      description: 'Thank you for your valuable feedback.'
    });

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
        className={`w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-white">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <MessageSquare className="w-8 h-8" />
          </motion.div>
          <h2 className="text-3xl font-bold text-center mb-2">Share Your Feedback</h2>
          <p className="text-center text-blue-100">
            Help us improve our services
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Grievance Info */}
          <div className={`p-4 rounded-xl border ${
            isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50 border-blue-200'
          }`}>
            <p className={`text-xs uppercase tracking-wide mb-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Grievance #{grievanceId}
            </p>
            <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {grievanceTitle}
            </p>
          </div>

          {/* Star Rating */}
          <div>
            <label className={`block text-sm font-medium mb-3 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              How would you rate the resolution? <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center justify-center gap-2 py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-12 h-12 transition-all ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : isDarkMode
                        ? 'text-gray-600'
                        : 'text-gray-300'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-gray-500 mt-2">
                {rating === 1 && 'Very Poor'}
                {rating === 2 && 'Poor'}
                {rating === 3 && 'Average'}
                {rating === 4 && 'Good'}
                {rating === 5 && 'Excellent'}
              </p>
            )}
          </div>

          {/* Satisfaction Level */}
          <div>
            <label className={`block text-sm font-medium mb-3 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Are you satisfied with the resolution? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSatisfaction('satisfied')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  satisfaction === 'satisfied'
                    ? 'border-transparent bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg'
                    : isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <ThumbsUp className={`w-8 h-8 mx-auto mb-2 ${
                  satisfaction === 'satisfied' ? 'text-white' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <p className="font-semibold">Satisfied</p>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSatisfaction('dissatisfied')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  satisfaction === 'dissatisfied'
                    ? 'border-transparent bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-lg'
                    : isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <ThumbsDown className={`w-8 h-8 mx-auto mb-2 ${
                  satisfaction === 'dissatisfied' ? 'text-white' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <p className="font-semibold">Dissatisfied</p>
              </motion.button>
            </div>
          </div>

          {/* Would Recommend */}
          <div>
            <label className={`block text-sm font-medium mb-3 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Would you recommend our grievance system?
            </label>
            <div className="flex gap-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setWouldRecommend(true)}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  wouldRecommend === true
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Yes
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setWouldRecommend(false)}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  wouldRecommend === false
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg'
                    : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                No
              </motion.button>
            </div>
          </div>

          {/* Detailed Feedback */}
          <div>
            <label htmlFor="feedback" className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Additional Comments (Optional)
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              placeholder="Share your experience or suggestions for improvement..."
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all resize-none ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                  : 'bg-white border-gray-200 focus:border-blue-500 focus:bg-blue-50/30'
              }`}
            />
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
              Skip for Now
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Send className="w-5 h-5" />
              Submit Feedback
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
