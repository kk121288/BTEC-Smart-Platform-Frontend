import AppLayout from '../layouts/AppLayout';
import { useAuth } from '../context/AuthContext';
import { FileText, Clock, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Assignments',
      value: '24',
      icon: FileText,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      title: 'Pending Reviews',
      value: '7',
      icon: Clock,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Flagged Submissions',
      value: '3',
      icon: AlertTriangle,
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
    },
  ];

  const recentActivity = [
    {
      student: 'John Doe',
      assignment: 'Assignment 1',
      status: 'Submitted',
      time: '2 hours ago',
    },
    {
      student: 'Jane Smith',
      assignment: 'Assignment 2',
      status: 'Under Review',
      time: '4 hours ago',
    },
    {
      student: 'Bob Johnson',
      assignment: 'Assignment 1',
      status: 'Flagged',
      time: '1 day ago',
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Message */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your assignments today.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-4 rounded-full`}>
                  <stat.icon className={stat.textColor} size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {activity.student}
                  </p>
                  <p className="text-sm text-gray-600">{activity.assignment}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      activity.status === 'Submitted'
                        ? 'bg-green-100 text-green-800'
                        : activity.status === 'Under Review'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {activity.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
