import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Upload,
  FileText,
  Users,
  ClipboardList,
  Settings,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/upload', icon: Upload, label: 'Upload' },
  { path: '/results', icon: FileText, label: 'Results' },
  { path: '/students', icon: Users, label: 'Students' },
  { path: '/assignments', icon: ClipboardList, label: 'Assignments' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { logout } = useAuth();
  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: sidebarOpen ? 256 : 80,
          x: 0,
        }}
        className={cn(
          'fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transition-all duration-300',
          'lg:static lg:translate-x-0',
          !sidebarOpen && 'max-lg:-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
            <motion.div
              initial={false}
              animate={{ opacity: sidebarOpen ? 1 : 0 }}
              className="flex items-center gap-2 overflow-hidden"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                B
              </div>
              {sidebarOpen && (
                <span className="font-bold text-gray-900 dark:text-white whitespace-nowrap">
                  BTEC Platform
                </span>
              )}
            </motion.div>

            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft
                className={cn(
                  'transition-transform duration-300',
                  !sidebarOpen && 'rotate-180'
                )}
                size={20}
              />
            </button>
          </div>

          {/* User Info */}
          {sidebarOpen && user && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                        'hover:bg-gray-100 dark:hover:bg-gray-800',
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'text-gray-700 dark:text-gray-300'
                      )
                    }
                  >
                    <item.icon size={20} className="flex-shrink-0" />
                    {sidebarOpen && (
                      <span className="font-medium whitespace-nowrap">{item.label}</span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={handleLogout}
              className={cn(
                'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200',
                'hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400'
              )}
            >
              <LogOut size={20} className="flex-shrink-0" />
              {sidebarOpen && <span className="font-medium whitespace-nowrap">Logout</span>}
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
