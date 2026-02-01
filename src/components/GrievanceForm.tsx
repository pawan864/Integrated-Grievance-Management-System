import { useState } from 'react';
import { GrievanceCategory, Grievance } from '../App';
import { Send, AlertCircle, Sparkles, CheckCircle2, Upload, FileText, X } from 'lucide-react';
import { motion } from 'motion/react';

interface GrievanceFormProps {
  onSubmit: (grievance: Omit<Grievance, 'id' | 'status' | 'submittedDate' | 'updatedDate'>) => void;
}

export function GrievanceForm({ onSubmit }: GrievanceFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Maintenance' as GrievanceCategory,
    description: '',
    submittedBy: '',
    contactNumber: '',
    email: '',
    location: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const categories: GrievanceCategory[] = [
    'Maintenance',
    'Security',
    'Cleanliness',
    'Water Supply',
    'Electricity',
    'Parking',
    'Noise Complaint',
    'Other'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.submittedBy.trim()) newErrors.submittedBy = 'Your name is required';
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid 10-digit number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      // Reset form
      setFormData({
        title: '',
        category: 'Maintenance',
        description: '',
        submittedBy: '',
        contactNumber: '',
        email: '',
        location: '',
        priority: 'medium'
      });
      setErrors({});
      setUploadedFile(null);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Submit New Grievance</h2>
          </div>
          <p className="text-sm text-gray-600 ml-14">
            Please fill in all the details below to register your complaint
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Grievance Title <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onFocus={() => setFocusedField('title')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                  errors.title 
                    ? 'border-red-500 bg-red-50' 
                    : focusedField === 'title'
                    ? 'border-blue-500 bg-blue-50/30 shadow-lg shadow-blue-100'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Brief title of your complaint"
              />
              {formData.title && !errors.title && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
            </div>
            {errors.title && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.title}
              </motion.p>
            )}
          </motion.div>

          {/* Category and Priority */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-blue-50/30 hover:border-gray-300 transition-all duration-300 bg-white cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority Level <span className="text-red-500">*</span>
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-blue-50/30 hover:border-gray-300 transition-all duration-300 bg-white cursor-pointer"
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onFocus={() => setFocusedField('description')}
              onBlur={() => setFocusedField(null)}
              rows={5}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 resize-none ${
                errors.description 
                  ? 'border-red-500 bg-red-50' 
                  : focusedField === 'description'
                  ? 'border-blue-500 bg-blue-50/30 shadow-lg shadow-blue-100'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              placeholder="Provide detailed description of your complaint"
            />
            {errors.description && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.description}
              </motion.p>
            )}
          </motion.div>

          {/* Personal Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label htmlFor="submittedBy" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="submittedBy"
                name="submittedBy"
                value={formData.submittedBy}
                onChange={handleChange}
                onFocus={() => setFocusedField('submittedBy')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                  errors.submittedBy 
                    ? 'border-red-500 bg-red-50' 
                    : focusedField === 'submittedBy'
                    ? 'border-blue-500 bg-blue-50/30 shadow-lg shadow-blue-100'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.submittedBy && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.submittedBy}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                onFocus={() => setFocusedField('contactNumber')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                  errors.contactNumber 
                    ? 'border-red-500 bg-red-50' 
                    : focusedField === 'contactNumber'
                    ? 'border-blue-500 bg-blue-50/30 shadow-lg shadow-blue-100'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="10-digit mobile number"
              />
              {errors.contactNumber && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.contactNumber}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Email and Location */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                  errors.email 
                    ? 'border-red-500 bg-red-50' 
                    : focusedField === 'email'
                    ? 'border-blue-500 bg-blue-50/30 shadow-lg shadow-blue-100'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location/Block <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                onFocus={() => setFocusedField('location')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                  errors.location 
                    ? 'border-red-500 bg-red-50' 
                    : focusedField === 'location'
                    ? 'border-blue-500 bg-blue-50/30 shadow-lg shadow-blue-100'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Building/Block number"
              />
              {errors.location && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.location}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* File Upload */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Supporting Documents
            </label>
            <div className="relative">
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-blue-50/30 hover:border-gray-300 transition-all duration-300"
              />
              {uploadedFile && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-500">{uploadedFile.name}</span>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-red-500 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex justify-end pt-4"
          >
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            >
              <Send className="w-5 h-5" />
              Submit Grievance
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}