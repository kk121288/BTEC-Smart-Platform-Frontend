import { DashboardWidget } from '@/components/charts/DashboardWidget';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { PieChart } from '@/components/charts/PieChart';
import { Badge } from '@/components/ui/Badge';

export default function Dashboard() {
  // Sample data
  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Assignments',
        data: [65, 78, 85, 81, 92, 88],
        borderColor: '#00ffcc',
        backgroundColor: 'rgba(0, 255, 204, 0.1)',
        fill: true,
      },
      {
        label: 'Attendance',
        data: [85, 88, 90, 87, 95, 92],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
    ],
  };

  const gradeDistribution = {
    labels: ['Tech', 'Finance', 'Marketing', 'Cybersecurity', 'Innovation'],
    datasets: [
      {
        label: 'Performance',
        data: [85, 78, 92, 88, 90],
        backgroundColor: [
          'rgba(0, 255, 204, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: [
          '#00ffcc',
          '#3b82f6',
          '#8b5cf6',
          '#22c55e',
          '#f59e0b',
        ],
        borderWidth: 2,
      },
    ],
  };

  const courseCompletion = {
    labels: ['React', 'TypeScript', 'Node.js', 'Database', 'DevOps', 'Testing'],
    datasets: [
      {
        label: 'Completion %',
        data: [95, 88, 75, 60, 45, 82],
        backgroundColor: 'rgba(0, 255, 204, 0.6)',
        borderColor: '#00ffcc',
        borderWidth: 2,
      },
    ],
  };

  const stats = [
    { label: 'Total Students', value: '1,234', change: '+12%', icon: '👥', color: 'cyan' },
    { label: 'Active Courses', value: '42', change: '+3', icon: '📚', color: 'blue' },
    { label: 'Avg. Grade', value: '87%', change: '+5%', icon: '🎓', color: 'purple' },
    { label: 'Completion Rate', value: '92%', change: '+8%', icon: '✅', color: 'green' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Dashboard
            </h1>
            <p className="text-gray-400 mt-2">Welcome back! Here's your overview</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition">
              This Week
            </button>
            <button className="px-4 py-2 bg-black/50 border border-cyan-500/30 text-gray-400 rounded-lg hover:border-cyan-500/50 transition">
              This Month
            </button>
            <button className="px-4 py-2 bg-black/50 border border-cyan-500/30 text-gray-400 rounded-lg hover:border-cyan-500/50 transition">
              This Year
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-xl p-6 hover:shadow-[0_0_30px_rgba(0,255,204,0.3)] transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-cyan-400 mb-2">{stat.value}</h3>
                  <Badge variant="success" size="sm">{stat.change}</Badge>
                </div>
                <span className="text-4xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardWidget
            title="Performance Trends"
            subtitle="Last 6 months"
            onExport={() => console.log('Export performance chart')}
          >
            <LineChart data={performanceData} height={300} />
          </DashboardWidget>

          <DashboardWidget
            title="Subject Performance"
            subtitle="Current semester"
            onExport={() => console.log('Export grade distribution')}
          >
            <PieChart data={gradeDistribution} height={300} />
          </DashboardWidget>
        </div>

        {/* Charts Row 2 */}
        <DashboardWidget
          title="Course Completion Progress"
          subtitle="All enrolled courses"
          onExport={() => console.log('Export completion chart')}
        >
          <BarChart data={courseCompletion} height={350} />
        </DashboardWidget>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Recent Assignments
            </h2>
            <div className="space-y-3">
              {[
                { title: 'React Hooks Project', due: 'Due in 2 days', status: 'pending' },
                { title: 'TypeScript Quiz', due: 'Due tomorrow', status: 'pending' },
                { title: 'Node.js API', due: 'Completed', status: 'completed' },
                { title: 'Database Design', due: 'Completed', status: 'completed' },
              ].map((assignment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-black/30 border border-cyan-500/20 rounded-lg"
                >
                  <div>
                    <h3 className="text-cyan-400 font-semibold">{assignment.title}</h3>
                    <p className="text-gray-500 text-sm">{assignment.due}</p>
                  </div>
                  <Badge variant={assignment.status === 'completed' ? 'success' : 'warning'}>
                    {assignment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Upcoming Classes
            </h2>
            <div className="space-y-3">
              {[
                { title: 'Advanced JavaScript', time: 'Today, 2:00 PM', room: 'Room 101' },
                { title: 'React Patterns', time: 'Tomorrow, 10:00 AM', room: 'Room 203' },
                { title: 'Web Security', time: 'Wed, 3:00 PM', room: 'Room 105' },
                { title: 'Cloud Computing', time: 'Thu, 1:00 PM', room: 'Online' },
              ].map((cls, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-black/30 border border-cyan-500/20 rounded-lg"
                >
                  <div className="w-2 h-2 mt-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,204,0.8)]"></div>
                  <div className="flex-1">
                    <h3 className="text-cyan-400 font-semibold">{cls.title}</h3>
                    <p className="text-gray-400 text-sm">{cls.time}</p>
                    <p className="text-gray-500 text-xs">{cls.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
