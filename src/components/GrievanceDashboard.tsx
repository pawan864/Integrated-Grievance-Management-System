import { useState, useMemo } from 'react';
import { Grievance } from '../App';
import { GrievanceCard } from './GrievanceCard';
import { Search, Filter, TrendingUp, Clock, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface GrievanceDashboardProps {
  grievances: Grievance[];
}

export function GrievanceDashboard({ grievances }: GrievanceDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showCharts, setShowCharts] = useState(false);

  const stats = useMemo(() => {
    const pending = grievances.filter(g => g.status === 'pending').length;
    const inProgress = grievances.filter(g => g.status === 'in-progress').length;
    const resolved = grievances.filter(g => g.status === 'resolved').length;
    const rejected = grievances.filter(g => g.status === 'rejected').length;

    return { pending, inProgress, resolved, rejected };
  }, [grievances]);

  const filteredGrievances = useMemo(() => {
    return grievances.filter(grievance => {
      const matchesSearch = 
        grievance.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grievance.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grievance.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || grievance.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || grievance.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [grievances, searchTerm, statusFilter, categoryFilter]);

  const categories = Array.from(new Set(grievances.map(g => g.category)));

  // Chart data
  const pieData = [
    { name: 'Pending', value: stats.pending, color: '#f97316' },
    { name: 'In Progress', value: stats.inProgress, color: '#3b82f6' },
    { name: 'Resolved', value: stats.resolved, color: '#22c55e' },
    { name: 'Rejected', value: stats.rejected, color: '#ef4444' }
  ].filter(item => item.value > 0);

  const categoryData = categories.map(cat => ({
    name: cat,
    count: grievances.filter(g => g.category === cat).length
  }));

  const statCards = [
    { 
      label: 'Pending', 
      value: stats.pending, 
      icon: Clock, 
      color: 'orange',
      gradient: 'from-orange-400 to-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-600'
    },
    { 
      label: 'In Progress', 
      value: stats.inProgress, 
      icon: TrendingUp, 
      color: 'blue',
      gradient: 'from-blue-400 to-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600'
    },
    { 
      label: 'Resolved', 
      value: stats.resolved, 
      icon: CheckCircle, 
      color: 'green',
      gradient: 'from-green-400 to-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-600'
    },
    { 
      label: 'Rejected', 
      value: stats.rejected, 
      icon: XCircle, 
      color: 'red',
      gradient: 'from-red-400 to-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`bg-white p-6 rounded-2xl border-2 ${stat.border} shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <motion.p 
                  className={`text-3xl font-bold ${stat.text}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                >
                  {stat.value}
                </motion.p>
              </div>
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Toggle Button */}
      <motion.button
        onClick={() => setShowCharts(!showCharts)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <BarChart3 className="w-5 h-5" />
        {showCharts ? 'Hide Analytics' : 'Show Analytics'}
      </motion.button>

      {/* Charts Section */}
      {showCharts && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Grievances by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search grievances..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-blue-50/30 hover:border-gray-300 transition-all duration-300"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-blue-50/30 hover:border-gray-300 transition-all duration-300 cursor-pointer bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-blue-50/30 hover:border-gray-300 transition-all duration-300 cursor-pointer bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Grievances List */}
      <div className="space-y-4">
        {filteredGrievances.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-12 rounded-2xl border-2 border-dashed border-gray-300 text-center"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No grievances found matching your criteria.</p>
          </motion.div>
        ) : (
          filteredGrievances.map((grievance, index) => (
            <motion.div
              key={grievance.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GrievanceCard grievance={grievance} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
