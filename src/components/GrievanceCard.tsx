import { Grievance } from '../App';
import { Calendar, MapPin, User, Phone, Mail, AlertTriangle, TrendingUp, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface GrievanceCardProps {
  grievance: Grievance;
}

export function GrievanceCard({ grievance }: GrievanceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertTriangle className="w-4 h-4" />;
      case 'in-progress':
        return <TrendingUp className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-3">
              <h3 className="text-xl font-semibold text-gray-900 flex-1 hover:text-blue-600 transition-colors">
                {grievance.title}
              </h3>
              <div className="flex gap-2 flex-shrink-0">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 ${getPriorityColor(grievance.priority)} uppercase shadow-sm`}
                >
                  {grievance.priority}
                </motion.span>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 flex items-center gap-1.5 ${getStatusColor(grievance.status)} shadow-sm`}
                >
                  {getStatusIcon(grievance.status)}
                  {grievance.status.replace('-', ' ')}
                </motion.span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 text-blue-700">
                {grievance.category}
              </span>
              <span className="text-xs text-gray-500 font-mono">ID: #{grievance.id}</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </motion.button>
        </div>

        {/* Description Preview */}
        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed line-clamp-2">{grievance.description}</p>
        </div>

        {/* Quick Info */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span className="font-medium text-gray-900">{grievance.submittedBy}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span>{grievance.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(grievance.submittedDate)}</span>
          </div>
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 border-t-2 border-gray-100 pt-4"
            >
              {/* Full Description */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Full Description:</p>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-200">
                  {grievance.description}
                </p>
              </div>

              {/* Detailed Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-600">Submitted by</span>
                    <p className="font-medium text-gray-900">{grievance.submittedBy}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
                >
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MapPin className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-600">Location</span>
                    <p className="font-medium text-gray-900">{grievance.location}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
                >
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Phone className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-600">Contact</span>
                    <p className="font-medium text-gray-900">{grievance.contactNumber}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
                >
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Mail className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-600">Email</span>
                    <p className="font-medium text-gray-900 text-sm truncate">{grievance.email}</p>
                  </div>
                </motion.div>
              </div>

              {/* Assignment and Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-4">
                  {grievance.assignedTo && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-100 rounded-lg border border-blue-300"
                    >
                      <User className="w-4 h-4 text-blue-700" />
                      <span className="text-sm font-medium text-blue-700">
                        Assigned to: {grievance.assignedTo}
                      </span>
                    </motion.div>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  Updated: <span className="font-medium text-gray-900">{formatDate(grievance.updatedDate)}</span>
                </div>
              </div>

              {/* Resolution */}
              {grievance.resolution && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <p className="text-sm font-semibold text-green-900">Resolution:</p>
                  </div>
                  <p className="text-sm text-green-800 leading-relaxed">{grievance.resolution}</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}