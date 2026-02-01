import { motion } from 'motion/react';
import { Shield, Clock, BarChart3, Users, CheckCircle, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';

interface HomeProps {
  isAuthenticated: boolean;
  onNavigate: (tab: string) => void;
  isDarkMode?: boolean;
  stats?: {
    total: number;
    pending: number;
    resolved: number;
    inProgress: number;
  };
}

export function Home({ isAuthenticated, onNavigate, stats, isDarkMode = false }: HomeProps) {
  const features = [
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your complaints are handled with complete confidentiality and security',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      icon: Clock,
      title: 'Quick Resolution',
      description: 'Fast-track your grievances with our efficient tracking system',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Real-time Tracking',
      description: 'Monitor your complaint status with live updates and notifications',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a better society together through transparent communication',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100',
      textColor: 'text-green-600'
    }
  ];

  const steps = [
    { number: '1', title: 'Submit Grievance', desc: 'Fill out the complaint form with details' },
    { number: '2', title: 'Track Status', desc: 'Monitor progress in real-time' },
    { number: '3', title: 'Get Resolution', desc: 'Receive updates and solutions' }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, -50, 0],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full mb-6 shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Welcome to Your Community Portal</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Integrated Grievance
              </span>
              <br />
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Management System</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`text-xl max-w-3xl mx-auto mb-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Your voice matters! Submit, track, and resolve community issues efficiently. 
              Join us in building a better living experience for everyone.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {isAuthenticated ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('submit')}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300"
                  >
                    Submit Grievance
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('dashboard')}
                    className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    View Dashboard
                    <BarChart3 className="w-5 h-5" />
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('login')}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('register')}
                    className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    Create Account
                    <Sparkles className="w-5 h-5" />
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Stats Section - Only show when authenticated */}
          {isAuthenticated && stats && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { label: 'Total Grievances', value: stats.total, icon: BarChart3, color: 'from-blue-500 to-cyan-500' },
                { label: 'Pending', value: stats.pending, icon: Clock, color: 'from-orange-500 to-red-500' },
                { label: 'In Progress', value: stats.inProgress, icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
                { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'from-green-500 to-emerald-500' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border-2 border-gray-200 shadow-xl"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Platform?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Streamlined grievance management with powerful features designed for your convenience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`${feature.bgColor} p-8 rounded-3xl border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-semibold ${feature.textColor} mb-3`}>{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple three-step process to get your grievances resolved
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 -translate-y-1/2 -z-10" />

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border-2 border-gray-200 shadow-xl text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                  >
                    <span className="text-3xl font-bold text-white">{step.number}</span>
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 rounded-3xl shadow-2xl relative overflow-hidden"
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }} />
              </div>

              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Join your community in making a difference. Submit your first grievance today!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('register')}
                    className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    Create Free Account
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('login')}
                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300"
                  >
                    Sign In
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}