import React, { useState } from 'react';
import { LogOut, BookOpen, Clock, Key } from 'lucide-react';
import QuestionTab from './QuestionTab';
import TimerTab from './TimerTab';
import InviteTab from './InviteTab';
import { Question, InviteCode, QuizSettings } from '../../types';

interface AdminPanelProps {
  inviteCodes: InviteCode[];
  onCreateCode: (code: InviteCode) => void;
  onDeleteCode: (id: string) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  inviteCodes,
  onCreateCode,
  onDeleteCode,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState('invites');
  const [quizSettings, setQuizSettings] = useState<QuizSettings>({
    startTime: null,
    endTime: null,
    isActive: false,
  });

  const handleUpdateSettings = (settings: QuizSettings) => {
    setQuizSettings(settings);
  };

  const tabs = [
    { id: 'questions', label: 'Questions', icon: BookOpen },
    { id: 'timer', label: 'Timer Settings', icon: Clock },
    { id: 'invites', label: 'Invite Codes', icon: Key },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b">
            <nav className="flex">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors
                    ${activeTab === id
                      ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'questions' && (
              <QuestionTab
                questions={[]}
                onAddQuestion={() => {}}
                onDeleteQuestion={() => {}}
                onEditQuestion={() => {}}
              />
            )}
            {activeTab === 'timer' && (
              <TimerTab
                settings={quizSettings}
                onUpdateSettings={handleUpdateSettings}
              />
            )}
            {activeTab === 'invites' && (
              <InviteTab
                inviteCodes={inviteCodes}
                onCreateCode={onCreateCode}
                onDeleteCode={onDeleteCode}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;