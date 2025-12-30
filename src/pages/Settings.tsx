import { useState } from 'react';
import { Tabs } from '@/components/ui/Tabs';

export default function Settings() {
  const [settings, setSettings] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    language: 'en',
    theme: 'dark',
    notifications: true,
    twoFactor: false,
    fontSize: 'medium',
    colorScheme: 'cyan',
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // TODO: Implement API call
  };

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-cyan-400 mb-2 font-semibold">Full Name</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
            />
          </div>
          <div>
            <label className="block text-cyan-400 mb-2 font-semibold">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
            />
          </div>
          <div>
            <label className="block text-cyan-400 mb-2 font-semibold">Phone</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-cyan-400 mb-2 font-semibold">Language</label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 rounded-lg text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="en">English</option>
              <option value="ar">العربية (Arabic)</option>
            </select>
          </div>
          <div>
            <label className="block text-cyan-400 mb-2 font-semibold">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 rounded-lg text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-cyan-400 font-semibold">Enable Notifications</span>
            <button
              onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                settings.notifications ? 'bg-cyan-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.notifications ? 'translate-x-7' : 'translate-x-0'
                }`}
              ></span>
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'security',
      label: 'Security',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-cyan-400 mb-2 font-semibold">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 rounded-lg text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="block text-cyan-400 mb-2 font-semibold">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 rounded-lg text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="block text-cyan-400 mb-2 font-semibold">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 rounded-lg text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-cyan-500/30">
            <div>
              <span className="text-cyan-400 font-semibold">Two-Factor Authentication</span>
              <p className="text-gray-500 text-sm">Add an extra layer of security</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, twoFactor: !settings.twoFactor })}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                settings.twoFactor ? 'bg-cyan-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.twoFactor ? 'translate-x-7' : 'translate-x-0'
                }`}
              ></span>
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Settings
          </h1>
          <p className="text-gray-400 mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,255,204,0.3)]">
          <Tabs tabs={tabs} vertical />

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-cyan-500/30">
            <button className="px-6 py-3 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 transition">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition shadow-[0_0_20px_rgba(0,255,204,0.5)]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
