import { useState } from 'react';
import { Grievance, GrievanceStatus } from '../App';
import { Edit2, Trash2, Save, X, User, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminPanelProps {
  grievances: Grievance[];
  onUpdate: (id: string, updates: Partial<Grievance>) => void;
  onDelete: (id: string) => void;
}

export function AdminPanel({ grievances, onUpdate, onDelete }: AdminPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    status: GrievanceStatus;
    assignedTo: string;
    resolution: string;
  }>({
    status: 'pending',
    assignedTo: '',
    resolution: ''
  });

  const handleEdit = (grievance: Grievance) => {
    setEditingId(grievance.id);
    setEditForm({
      status: grievance.status,
      assignedTo: grievance.assignedTo || '',
      resolution: grievance.resolution || ''
    });
  };

  const handleSave = (id: string) => {
    onUpdate(id, {
      status: editForm.status,
      assignedTo: editForm.assignedTo || undefined,
      resolution: editForm.resolution || undefined
    });
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({
      status: 'pending',
      assignedTo: '',
      resolution: ''
    });
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the grievance: "${title}"?`)) {
      onDelete(id);
    }
  };

  const getStatusColor = (status: GrievanceStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-2xl shadow-xl text-white"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-1">Admin Control Panel</h2>
            <p className="text-sm text-blue-100">
              Manage, update status, assign teams, and resolve grievances
            </p>
          </div>
        </div>
      </motion.div>

      {grievances.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-16 rounded-2xl border-2 border-dashed border-gray-300 text-center"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">No grievances to manage yet.</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {grievances.map((grievance, index) => (
            <motion.div
              key={grievance.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <h3 className="text-xl font-semibold text-gray-900 flex-1">
                        {grievance.title}
                      </h3>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase shadow-sm ${getPriorityColor(grievance.priority)}`}>
                        {grievance.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Category:</span> {grievance.category} • 
                      <span className="ml-2 font-medium">ID:</span> <span className="font-mono">#{grievance.id}</span>
                    </p>
                  </div>
                  
                  {editingId !== grievance.id && (
                    <div className="flex gap-2 ml-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(grievance)}
                        className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 border-2 border-transparent hover:border-blue-200 shadow-sm"
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(grievance.id, grievance.title)}
                        className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 border-2 border-transparent hover:border-red-200 shadow-sm"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-200">{grievance.description}</p>
                </div>

                {/* Submitter Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                  <div className="text-sm">
                    <span className="text-gray-600 block mb-1">Submitted by:</span>
                    <p className="font-medium text-gray-900">{grievance.submittedBy}</p>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600 block mb-1">Contact:</span>
                    <p className="font-medium text-gray-900">{grievance.contactNumber}</p>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600 block mb-1">Location:</span>
                    <p className="font-medium text-gray-900">{grievance.location}</p>
                  </div>
                </div>

                {/* Editing Form or View Mode */}
                <AnimatePresence mode="wait">
                  {editingId === grievance.id ? (
                    <motion.div
                      key="edit-mode"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="border-t-2 border-gray-200 pt-6 space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Status */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                          </label>
                          <select
                            value={editForm.status}
                            onChange={(e) => setEditForm({ ...editForm, status: e.target.value as GrievanceStatus })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-blue-50/30 hover:border-gray-300 transition-all duration-300 bg-white cursor-pointer"
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>

                        {/* Assign To */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Assign To
                          </label>
                          <input
                            type="text"
                            value={editForm.assignedTo}
                            onChange={(e) => setEditForm({ ...editForm, assignedTo: e.target.value })}
                            placeholder="Team or person name"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-blue-50/30 hover:border-gray-300 transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Resolution */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Resolution / Notes
                        </label>
                        <textarea
                          value={editForm.resolution}
                          onChange={(e) => setEditForm({ ...editForm, resolution: e.target.value })}
                          placeholder="Add resolution notes or action taken..."
                          rows={4}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-blue-50/30 hover:border-gray-300 transition-all duration-300 resize-none"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 justify-end pt-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleCancel}
                          className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSave(grievance.id)}
                          className="flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="view-mode"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-t-2 border-gray-200 pt-4"
                    >
                      <div className="flex items-center justify-between text-sm flex-wrap gap-3">
                        <div className="flex items-center gap-3">
                          <span className={`px-4 py-2 rounded-xl text-xs font-medium shadow-sm ${getStatusColor(grievance.status)}`}>
                            {grievance.status.replace('-', ' ').toUpperCase()}
                          </span>
                          {grievance.assignedTo && (
                            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-xl border border-blue-200 text-blue-700">
                              <User className="w-4 h-4" />
                              <span className="text-xs font-medium">Assigned to: {grievance.assignedTo}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-gray-500">
                          Updated: <span className="font-medium text-gray-900">{formatDate(grievance.updatedDate)}</span>
                        </div>
                      </div>

                      {grievance.resolution && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl shadow-sm"
                        >
                          <p className="text-sm font-semibold text-green-900 mb-2">Resolution:</p>
                          <p className="text-sm text-green-800 leading-relaxed">{grievance.resolution}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}