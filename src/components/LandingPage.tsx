import React, { useState } from 'react';
import { Shield, Lock, ArrowRight, AlertCircle } from 'lucide-react';

interface LandingPageProps {
  onInviteCodeSubmit: (code: string) => boolean;
  onAdminLogin: (password: string) => void;
  isAuthenticated: boolean;
  error: string;
}

const LandingPage: React.FC<LandingPageProps> = ({
  onInviteCodeSubmit,
  onAdminLogin,
  error,
}) => {
  const [inviteCode, setInviteCode] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInviteCodeSubmit(inviteCode);
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdminLogin(adminPassword);
    setAdminPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center animate-fade-in">
          <Shield className="w-16 h-16 text-white mx-auto" />
          <h1 className="mt-6 text-4xl font-bold text-white">Quiz Challenge</h1>
          <p className="mt-2 text-lg text-purple-100">Enter your invite code to begin</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 animate-bounce-in">
          <form onSubmit={handleInviteSubmit} className="space-y-6">
            <div>
              <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700">
                Invite Code
              </label>
              <div className="mt-1 relative">
                <input
                  id="inviteCode"
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your invite code"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm animate-fade-in">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-transparent 
                text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
              Start Quiz
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        <div className="text-center animate-fade-in">
          {showAdminLogin ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Admin password"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg 
                    text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 
                    bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  Login as Admin
                </button>
              </form>
            </div>
          ) : (
            <button
              onClick={() => setShowAdminLogin(true)}
              className="text-white/60 hover:text-white text-sm flex items-center gap-1 mx-auto transition-colors"
            >
              <Lock className="w-4 h-4" />
              Admin Access
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;