import React from 'react';
import { Clock, Save } from 'lucide-react';
import { QuizSettings } from '../../types';

interface TimerTabProps {
  settings: QuizSettings;
  onUpdateSettings: (settings: QuizSettings) => void;
}

const TimerTab: React.FC<TimerTabProps> = ({ settings, onUpdateSettings }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      ...settings,
      isActive: true,
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-8 h-8 text-purple-500" />
          <h2 className="text-2xl font-semibold text-gray-800">Timer Settings</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quiz Start Time
              </label>
              <input
                type="datetime-local"
                value={settings.startTime || ''}
                onChange={(e) => onUpdateSettings({ ...settings, startTime: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quiz End Time
              </label>
              <input
                type="datetime-local"
                value={settings.endTime || ''}
                onChange={(e) => onUpdateSettings({ ...settings, endTime: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4">
            <input
              type="checkbox"
              id="isActive"
              checked={settings.isActive}
              onChange={(e) => onUpdateSettings({ ...settings, isActive: e.target.checked })}
              className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Quiz is currently active
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg
              flex items-center justify-center gap-2 transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Settings
          </button>
        </form>
      </div>

      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Current Status</h3>
        <div className="space-y-3">
          <p className="text-gray-600">
            <span className="font-medium">Start Time:</span>{' '}
            {settings.startTime ? new Date(settings.startTime).toLocaleString() : 'Not set'}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">End Time:</span>{' '}
            {settings.endTime ? new Date(settings.endTime).toLocaleString() : 'Not set'}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Status:</span>{' '}
            <span className={`font-medium ${settings.isActive ? 'text-green-500' : 'text-red-500'}`}>
              {settings.isActive ? 'Active' : 'Inactive'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimerTab;