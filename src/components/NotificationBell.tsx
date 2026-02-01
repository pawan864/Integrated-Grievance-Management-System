import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, CheckCheck, MessageSquare, AlertCircle, FileText, Clock } from 'lucide-react';

interface Notification {
  id: string;
  type: 'message' | 'status' | 'feedback' | 'alert';
  title: string;
  description: string;
  time: string;
  read: boolean;
  from?: string;
}

interface NotificationBellProps {
  userRole: 'admin' | 'employee' | 'user';
  isDarkMode: boolean;
}

export function NotificationBell({ userRole, isDarkMode }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'status',
      title: 'Grievance Updated',
      description: 'Your water leakage complaint status changed to "In Progress"',
      time: '5 min ago',
      read: false,
      from: 'Admin Team'
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      description: 'You have a new message from the maintenance team',
      time: '1 hour ago',
      read: false,
      from: 'Maintenance Team'
    },
    {
      id: '3',
      type: 'feedback',
      title: 'Feedback Request',
      description: 'Please provide feedback for resolved complaint #1234',
      time: '2 hours ago',
      read: true,
      from: 'System'
    },
    {
      id: '4',
      type: 'alert',
      title: 'High Priority Alert',
      description: 'New high priority grievance requires immediate attention',
      time: '3 hours ago',
      read: true,
      from: 'System'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'message': return MessageSquare;
      case 'status': return FileText;
      case 'feedback': return CheckCheck;
      case 'alert': return AlertCircle;
      default: return Bell;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'message': return 'from-blue-500 to-cyan-500';
      case 'status': return 'from-purple-500 to-pink-500';
      case 'feedback': return 'from-green-500 to-emerald-500';
      case 'alert': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-xl transition-colors ${
          isDarkMode 
            ? 'hover:bg-gray-700 text-gray-300' 
            : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Dropdown Panel */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`absolute right-0 mt-2 w-96 rounded-2xl shadow-2xl border z-50 ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              {/* Header */}
              <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Notifications
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`p-1 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'hover:bg-gray-700 text-gray-400'
                        : 'hover:bg-gray-100 text-gray-500'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className={`w-12 h-12 mx-auto mb-3 ${
                      isDarkMode ? 'text-gray-600' : 'text-gray-300'
                    }`} />
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      No notifications yet
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {notifications.map((notification) => {
                      const Icon = getIcon(notification.type);
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className={`p-4 hover:bg-opacity-50 transition-colors cursor-pointer ${
                            !notification.read
                              ? isDarkMode
                                ? 'bg-blue-900/20'
                                : 'bg-blue-50'
                              : isDarkMode
                              ? 'hover:bg-gray-700'
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getColor(notification.type)} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className={`text-sm font-semibold ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                                )}
                              </div>
                              <p className={`text-sm mb-2 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {notification.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className={`text-xs flex items-center gap-1 ${
                                  isDarkMode ? 'text-gray-500' : 'text-gray-500'
                                }`}>
                                  <Clock className="w-3 h-3" />
                                  {notification.time}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                  className={`text-xs px-2 py-1 rounded-lg transition-colors ${
                                    isDarkMode
                                      ? 'text-gray-400 hover:bg-gray-700'
                                      : 'text-gray-500 hover:bg-gray-200'
                                  }`}
                                >
                                  Dismiss
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className={`p-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <button className="w-full py-2 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors">
                    View all notifications
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
