import React from 'react';
import { Timer } from 'lucide-react';

interface QuizCardProps {
  question: {
    question: string;
    options: string[];
  };
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
  onAnswer: (index: number) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  currentQuestion,
  totalQuestions,
  timeLeft,
  onAnswer,
}) => {
  const colors = [
    'bg-red-500 hover:bg-red-600',
    'bg-blue-500 hover:bg-blue-600',
    'bg-yellow-500 hover:bg-yellow-600',
    'bg-green-500 hover:bg-green-600',
  ];

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-600 font-medium">
          Question {currentQuestion + 1}/{totalQuestions}
        </span>
        <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
          <Timer className="w-5 h-5 text-purple-600" />
          <span className="font-bold text-purple-600">{timeLeft}s</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        {question.question}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            className={`${colors[index]} text-white p-6 rounded-lg text-lg font-semibold 
              transition-transform duration-200 hover:scale-105 hover:shadow-lg
              flex items-center justify-center min-h-[100px]`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
          style={{ width: `${(timeLeft / 15) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default QuizCard;