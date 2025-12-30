import { Link } from 'react-router-dom';
import { Shield, Lock, Brain } from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'JWT-based security ensuring your data is protected',
    },
    {
      icon: Lock,
      title: 'Privacy Protection',
      description: 'Student data encryption with industry-standard protocols',
    },
    {
      icon: Brain,
      title: 'Accurate Detection',
      description: 'Advanced AI algorithms for precise plagiarism detection',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 animate-fade-in">
            BTEC Smart Platform
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 animate-fade-in-delay">
            AI-Powered Plagiarism Detection for Educational Excellence
          </p>
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          Safety-First Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <feature.icon className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 BTEC Smart Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
