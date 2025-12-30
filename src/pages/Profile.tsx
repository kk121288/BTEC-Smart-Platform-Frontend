import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';

export default function Profile() {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Student',
    joinDate: 'January 2024',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=00ffcc&color=000',
    stats: {
      assignmentsCompleted: 24,
      averageGrade: 87,
      attendance: 92,
      coursesEnrolled: 6,
    },
    achievements: [
      { id: 1, title: 'First Assignment', icon: '🎯', date: 'Jan 15, 2024' },
      { id: 2, title: 'Perfect Score', icon: '⭐', date: 'Feb 10, 2024' },
      { id: 3, title: 'Quick Learner', icon: '🚀', date: 'Mar 5, 2024' },
      { id: 4, title: '100% Attendance', icon: '📅', date: 'Apr 1, 2024' },
    ],
    recentActivity: [
      { id: 1, action: 'Completed assignment "React Fundamentals"', time: '2 hours ago' },
      { id: 2, action: 'Joined class "Advanced JavaScript"', time: '1 day ago' },
      { id: 3, action: 'Achieved 95% on "TypeScript Quiz"', time: '3 days ago' },
      { id: 4, action: 'Submitted project "Portfolio Website"', time: '1 week ago' },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,255,204,0.3)]">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-cyan-500/50 shadow-[0_0_30px_rgba(0,255,204,0.5)]"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {user.name}
              </h1>
              <p className="text-gray-400 mb-2">{user.email}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="primary">{user.role}</Badge>
                <Badge variant="info">Joined {user.joinDate}</Badge>
              </div>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition shadow-[0_0_20px_rgba(0,255,204,0.5)]">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Assignments Completed', value: user.stats.assignmentsCompleted, icon: '📝', color: 'cyan' },
            { label: 'Average Grade', value: `${user.stats.averageGrade}%`, icon: '🎓', color: 'blue' },
            { label: 'Attendance', value: `${user.stats.attendance}%`, icon: '✅', color: 'green' },
            { label: 'Courses Enrolled', value: user.stats.coursesEnrolled, icon: '📚', color: 'purple' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-xl p-6 text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Progress Bars */}
        <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Course Progress
          </h2>
          <div className="space-y-4">
            <Progress value={87} label="React Development" showLabel variant="default" />
            <Progress value={92} label="TypeScript Mastery" showLabel variant="success" />
            <Progress value={65} label="Node.js Backend" showLabel variant="warning" />
            <Progress value={45} label="Database Design" showLabel variant="default" />
          </div>
        </div>

        {/* Achievements and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Achievements */}
          <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Achievements
            </h2>
            <div className="space-y-3">
              {user.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-4 p-3 bg-black/30 border border-cyan-500/20 rounded-lg hover:border-cyan-500/50 transition"
                >
                  <span className="text-4xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-cyan-400 font-semibold">{achievement.title}</h3>
                    <p className="text-gray-500 text-sm">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Recent Activity
            </h2>
            <div className="space-y-4">
              {user.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,204,0.8)]"></div>
                  <div className="flex-1">
                    <p className="text-gray-300">{activity.action}</p>
                    <p className="text-gray-500 text-sm">{activity.time}</p>
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
