import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  TrendingUp,
  Clock,
  Upload,
  CheckCircle,
  BarChart3,
} from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

// Mock data for demonstration
const stats = [
  {
    title: 'Total Students',
    value: '1,284',
    change: '+12%',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Assignments',
    value: '48',
    change: '+4',
    icon: FileText,
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Average Grade',
    value: '85%',
    change: '+2.5%',
    icon: TrendingUp,
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'Pending Reviews',
    value: '23',
    change: '-5',
    icon: Clock,
    color: 'from-orange-500 to-orange-600',
  },
];

const recentActivities = [
  { id: 1, type: 'upload', message: 'New assignment uploaded: Database Design', time: '2 hours ago' },
  { id: 2, type: 'grade', message: 'Graded 15 submissions for Web Development', time: '5 hours ago' },
  { id: 3, type: 'student', message: 'New student enrolled: Sarah Johnson', time: '1 day ago' },
  { id: 4, type: 'result', message: 'Results published for Programming Fundamentals', time: '2 days ago' },
];

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's what's happening with your platform today
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Upload size={18} />}
          onClick={() => navigate('/upload')}
        >
          Upload Assignment
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      {stat.change} from last month
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}
                  >
                    <stat.icon className="text-white" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Placeholder */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 size={20} />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
              <div className="text-center">
                <BarChart3 className="mx-auto text-gray-400 dark:text-gray-600 mb-2" size={48} />
                <p className="text-gray-600 dark:text-gray-400">
                  Chart visualization ready
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Integration with Chart.js or Recharts
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex-shrink-0">
                    {activity.type === 'upload' && (
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <Upload className="text-blue-600 dark:text-blue-400" size={16} />
                      </div>
                    )}
                    {activity.type === 'grade' && (
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <CheckCircle className="text-green-600 dark:text-green-400" size={16} />
                      </div>
                    )}
                    {activity.type === 'student' && (
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                        <Users className="text-purple-600 dark:text-purple-400" size={16} />
                      </div>
                    )}
                    {activity.type === 'result' && (
                      <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                        <FileText className="text-orange-600 dark:text-orange-400" size={16} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="justify-start" onClick={() => navigate('/upload')}>
              <Upload size={18} />
              Upload Assignment
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => navigate('/students')}>
              <Users size={18} />
              Manage Students
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => navigate('/results')}>
              <FileText size={18} />
              View Results
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => navigate('/assignments')}>
              <CheckCircle size={18} />
              Assignments
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
