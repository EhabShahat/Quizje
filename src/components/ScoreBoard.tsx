import React from 'react';
import { Trophy, RefreshCw, Sparkles } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  total: number;
  onReset: () => void;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, total, onReset }) => {
  const percentage = (score / total) * 100;
  let message = '';
  let bgColor = '';
  const isHighScore = percentage >= 70;

  if (percentage === 100) {
    message = 'Perfect Score! 🎉';
    bgColor = 'bg-yellow-100';
  } else if (percentage >= 75) {
    message = 'Great Job! 🌟';
    bgColor = 'bg-green-100';
  } else if (percentage >= 50) {
    message = 'Good Try! 👍';
    bgColor = 'bg-blue-100';
  } else {
    message = 'Keep Practicing! 💪';
    bgColor = 'bg-red-100';
  }

  const renderSparkles = () => {
    if (!isHighScore) return null;

    return (
      <>
        {[...Array(6)].map((_, i) => (
          <Sparkles
            key={i}
            className={`sparkle absolute text-yellow-400 w-6 h-6`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </>
    );
  };

  return (
    <div className={`${bgColor} rounded-xl shadow-xl p-8 text-center animate-bounce-in relative overflow-hidden`}>
      {renderSparkles()}
      <div className={`relative z-10 ${isHighScore ? 'float' : ''}`}>
        <Trophy className={`w-16 h-16 mx-auto mb-4 ${isHighScore ? 'text-yellow-500' : 'text-gray-400'}`} />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{message}</h2>
        <p className="text-xl text-gray-600 mb-6">
          You scored {score} out of {total}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-8 overflow-hidden">
          <div
            className={`h-4 rounded-full transition-all duration-1000 ${
              isHighScore ? 'bg-yellow-500' : 'bg-gray-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <button
          onClick={onReset}
          className={`${
            isHighScore
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-purple-500 hover:bg-purple-600'
          } text-white px-8 py-3 rounded-full
            font-semibold flex items-center gap-2 mx-auto transition-all hover:scale-105`}
        >
          <RefreshCw className="w-5 h-5" />
          Play Again
        </button>
      </div>
      {isHighScore && (
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-200/20 to-transparent pointer-events-none" />
      )}
    </div>
  );
};

export default ScoreBoard;