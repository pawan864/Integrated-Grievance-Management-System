import { useState, useMemo } from 'react';
import { GrievanceForm } from './components/GrievanceForm';
import { GrievanceDashboard } from './components/GrievanceDashboard';
import { AdminPanel } from './components/AdminPanel';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Home } from './components/Home';
import { NotificationBell } from './components/NotificationBell';
import { MessagingPanel } from './components/MessagingPanel';
import { FeedbackForm } from './components/FeedbackForm';
import { FileText, LayoutDashboard, Settings, LogOut, User as UserIcon, Home as HomeIcon, LogIn, UserPlus, Moon, Sun, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster, toast } from 'sonner@2.0.3';

export type GrievanceStatus = 'pending' | 'in-progress' | 'resolved' | 'rejected';

export type GrievanceCategory = 
  | 'Maintenance' 
  | 'Security' 
  | 'Cleanliness' 
  | 'Water Supply' 
  | 'Electricity' 
  | 'Parking' 
  | 'Noise Complaint' 
  | 'Other';

export interface Grievance {
  id: string;
  title: string;
  category: GrievanceCategory;
  description: string;
  submittedBy: string;
  contactNumber: string;
  email: string;
  location: string;
  status: GrievanceStatus;
  priority: 'low' | 'medium' | 'high';
  submittedDate: Date;
  updatedDate: Date;
  assignedTo?: string;
  resolution?: string;
  attachments?: string[];
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: 'admin' | 'employee' | 'user' } | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'submit' | 'dashboard' | 'admin' | 'login' | 'register'>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackGrievance, setFeedbackGrievance] = useState<{ id: string; title: string } | null>(null);
  const [grievances, setGrievances] = useState<Grievance[]>([
    {
      id: '1',
      title: 'Water leakage in common area',
      category: 'Maintenance',
      description: 'There is a severe water leakage near the elevator on the 3rd floor.',
      submittedBy: 'Rajesh Kumar',
      contactNumber: '9876543210',
      email: 'rajesh@example.com',
      location: 'Building A, 3rd Floor',
      status: 'in-progress',
      priority: 'high',
      submittedDate: new Date('2026-01-27'),
      updatedDate: new Date('2026-01-28'),
      assignedTo: 'Maintenance Team'
    },
    {
      id: '2',
      title: 'Parking slot occupied by unknown vehicle',
      category: 'Parking',
      description: 'My assigned parking slot B-24 has been occupied by an unknown vehicle for the past 3 days.',
      submittedBy: 'Priya Sharma',
      contactNumber: '9876543211',
      email: 'priya@example.com',
      location: 'Parking Area B',
      status: 'pending',
      priority: 'medium',
      submittedDate: new Date('2026-01-28'),
      updatedDate: new Date('2026-01-28')
    },
    {
      id: '3',
      title: 'Street light not working',
      category: 'Electricity',
      description: 'The street light near gate 2 has been non-functional for a week.',
      submittedBy: 'Amit Patel',
      contactNumber: '9876543212',
      email: 'amit@example.com',
      location: 'Near Gate 2',
      status: 'resolved',
      priority: 'medium',
      submittedDate: new Date('2026-01-25'),
      updatedDate: new Date('2026-01-27'),
      assignedTo: 'Electrical Team',
      resolution: 'Replaced faulty bulb and repaired wiring.'
    }
  ]);

  const stats = useMemo(() => {
    const pending = grievances.filter(g => g.status === 'pending').length;
    const inProgress = grievances.filter(g => g.status === 'in-progress').length;
    const resolved = grievances.filter(g => g.status === 'resolved').length;

    return {
      total: grievances.length,
      pending,
      inProgress,
      resolved
    };
  }, [grievances]);

  const handleLogin = (email: string, password: string) => {
    // Admin credentials check
    if (email === 'admin@society.com' && password === 'admin@2026') {
      setCurrentUser({ name: 'Admin', email, role: 'admin' });
      setIsAuthenticated(true);
      setActiveTab('home');
      toast.success('Welcome Admin!', {
        description: 'You have full administrative access.'
      });
    } else if (email && password) {
      setCurrentUser({ name: email.split('@')[0], email, role: 'user' });
      setIsAuthenticated(true);
      setActiveTab('home');
      toast.success('Welcome back!', {
        description: 'You have successfully logged in.'
      });
    } else {
      toast.error('Invalid credentials');
    }
  };

  const handleRegister = (userData: {
    name: string;
    email: string;
    phone: string;
    flatNumber: string;
    password: string;
    role: 'admin' | 'employee' | 'user';
  }) => {
    setCurrentUser({ name: userData.name, email: userData.email, role: userData.role });
    setIsAuthenticated(true);
    setActiveTab('home');
    toast.success('Account created successfully!', {
      description: `Welcome to the Society Grievance Portal as ${userData.role}.`
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveTab('home');
    toast.info('Logged out successfully');
  };

  const handleSubmitGrievance = (grievance: Omit<Grievance, 'id' | 'status' | 'submittedDate' | 'updatedDate'>) => {
    const newGrievance: Grievance = {
      ...grievance,
      id: Date.now().toString(),
      status: 'pending',
      submittedDate: new Date(),
      updatedDate: new Date()
    };
    setGrievances([newGrievance, ...grievances]);
    toast.success('Grievance submitted successfully!', {
      description: `Your grievance #${newGrievance.id} has been registered.`
    });
    setActiveTab('dashboard');
  };

  const handleUpdateGrievance = (id: string, updates: Partial<Grievance>) => {
    setGrievances(grievances.map(g => 
      g.id === id ? { ...g, ...updates, updatedDate: new Date() } : g
    ));
    toast.success('Grievance updated successfully!', {
      description: 'The changes have been saved.'
    });
  };

  const handleDeleteGrievance = (id: string) => {
    setGrievances(grievances.filter(g => g.id !== id));
    toast.success('Grievance deleted successfully!');
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab as typeof activeTab);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' 
        : 'bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100'
    }`}>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute -top-1/2 -left-1/4 w-full h-full rounded-full blur-3xl ${
            isDarkMode 
              ? 'bg-gradient-to-br from-blue-800/30 to-transparent' 
              : 'bg-gradient-to-br from-sky-300/40 to-transparent'
          }`}
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [45, 0, 45],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute -bottom-1/2 -right-1/4 w-full h-full rounded-full blur-3xl ${
            isDarkMode 
              ? 'bg-gradient-to-tl from-indigo-800/30 to-transparent' 
              : 'bg-gradient-to-tl from-indigo-300/40 to-transparent'
          }`}
        />
        <motion.div
          animate={{
            y: [0, 100, 0],
            x: [0, -100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl ${
            isDarkMode 
              ? 'bg-gradient-to-br from-cyan-800/30 to-transparent' 
              : 'bg-gradient-to-br from-cyan-300/40 to-transparent'
          }`}
        />
      </div>

      <Toaster position="top-right" richColors theme={isDarkMode ? 'dark' : 'light'} />
      
      {/* Header */}
      <header className={`backdrop-blur-xl border-b sticky top-0 z-50 shadow-lg ${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-700' 
          : 'bg-white/80 border-gray-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setActiveTab('home')}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <HomeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Society Portal
                </h1>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Grievance Management</p>
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('home')}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === 'home'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <HomeIcon className="w-4 h-4 inline mr-2" />
                Home
              </motion.button>

              {isAuthenticated ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab('submit')}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === 'submit'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FileText className="w-4 h-4 inline mr-2" />
                    Submit
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === 'dashboard'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 inline mr-2" />
                    Dashboard
                  </motion.button>

                  {currentUser?.role === 'admin' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab('admin')}
                      className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                        activeTab === 'admin'
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                          : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Settings className="w-4 h-4 inline mr-2" />
                      Admin Panel
                    </motion.button>
                  )}

                  {/* Notification Bell */}
                  <NotificationBell userRole={currentUser?.role || 'user'} isDarkMode={isDarkMode} />

                  {/* Messaging Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowMessaging(true)}
                    className={`p-2 rounded-xl transition-colors ${
                      isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    title="Send Message"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </motion.button>

                  {/* Dark Mode Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`p-2 rounded-xl transition-colors ${
                      isDarkMode ? 'hover:bg-gray-700 text-yellow-400' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </motion.button>

                  <div className={`ml-2 flex items-center gap-2 px-4 py-2 rounded-xl border ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-gray-700 to-gray-800 border-gray-600' 
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300'
                  }`}>
                    <UserIcon className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{currentUser?.name}</span>
                    {currentUser?.role === 'admin' && (
                      <span className="ml-1 px-2 py-0.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full">
                        Admin
                      </span>
                    )}
                    {currentUser?.role === 'employee' && (
                      <span className="ml-1 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full">
                        Employee
                      </span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="ml-2 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab('login')}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === 'login'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <LogIn className="w-4 h-4 inline mr-2" />
                    Login
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab('register')}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg font-medium"
                  >
                    <UserPlus className="w-4 h-4 inline mr-2" />
                    Register
                  </motion.button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'home' && (
              <Home 
                isAuthenticated={isAuthenticated} 
                onNavigate={handleNavigate}
                stats={stats}
                isDarkMode={isDarkMode}
              />
            )}
            {activeTab === 'login' && (
              <div className="min-h-[calc(100vh-88px)] flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                  <Login
                    onLogin={handleLogin}
                    onSwitchToRegister={() => setActiveTab('register')}
                  />
                </div>
              </div>
            )}
            {activeTab === 'register' && (
              <div className="min-h-[calc(100vh-88px)] flex items-center justify-center p-4">
                <div className="w-full max-w-2xl">
                  <Register
                    onRegister={handleRegister}
                    onSwitchToLogin={() => setActiveTab('login')}
                  />
                </div>
              </div>
            )}
            {activeTab === 'submit' && isAuthenticated && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <GrievanceForm onSubmit={handleSubmitGrievance} />
              </div>
            )}
            {activeTab === 'dashboard' && isAuthenticated && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <GrievanceDashboard grievances={grievances} />
              </div>
            )}
            {activeTab === 'admin' && isAuthenticated && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <AdminPanel 
                  grievances={grievances} 
                  onUpdate={handleUpdateGrievance}
                  onDelete={handleDeleteGrievance}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Messaging Panel Modal */}
      <AnimatePresence>
        {showMessaging && currentUser && (
          <MessagingPanel
            currentUser={currentUser}
            isDarkMode={isDarkMode}
            onClose={() => setShowMessaging(false)}
          />
        )}
      </AnimatePresence>

      {/* Feedback Form Modal */}
      <AnimatePresence>
        {showFeedback && feedbackGrievance && (
          <FeedbackForm
            grievanceId={feedbackGrievance.id}
            grievanceTitle={feedbackGrievance.title}
            isDarkMode={isDarkMode}
            onClose={() => {
              setShowFeedback(false);
              setFeedbackGrievance(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}