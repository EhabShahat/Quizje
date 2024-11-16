import React, { useState, useEffect } from 'react';
import AdminPanel from './components/AdminPanel';
import LandingPage from './components/LandingPage';
import QuizCard from './components/QuizCard';
import ScoreBoard from './components/ScoreBoard';
import { InviteCode, Question } from './types';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inviteCodes, setInviteCodes] = useState<InviteCode[]>([]);
  const [error, setError] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizComplete, setQuizComplete] = useState(false);

  // Sample questions - in production these would come from your backend
  const questions: Question[] = [
    {
      id: '1',
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correct: 1,
    },
    {
      id: '2',
      question: 'Which planet is closest to the Sun?',
      options: ['Venus', 'Mars', 'Mercury', 'Earth'],
      correct: 2,
    },
    {
      id: '3',
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Madrid', 'Paris'],
      correct: 3,
    },
  ];

  useEffect(() => {
    const savedCodes = localStorage.getItem('inviteCodes');
    if (savedCodes) {
      setInviteCodes(JSON.parse(savedCodes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('inviteCodes', JSON.stringify(inviteCodes));
  }, [inviteCodes]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAuthenticated && !quizComplete && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      handleNextQuestion();
    }

    return () => clearInterval(timer);
  }, [timeLeft, isAuthenticated, quizComplete]);

  const handleAdminLogin = (password: string) => {
    if (password === 'admin123') {
      setIsAdmin(true);
      setError('');
    } else {
      setError('Invalid admin credentials');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  const handleInviteCodeSubmit = (code: string) => {
    const inviteCode = inviteCodes.find(c => c.code === code && !c.used);
    
    if (inviteCode) {
      setInviteCodes(codes => 
        codes.map(c => 
          c.id === inviteCode.id ? { ...c, used: true } : c
        )
      );
      setIsAuthenticated(true);
      setError('');
      return true;
    } else {
      setError('Invalid or already used invite code');
      return false;
    }
  };

  const handleCreateCode = (code: InviteCode) => {
    setInviteCodes(prev => [...prev, code]);
  };

  const handleDeleteCode = (id: string) => {
    setInviteCodes(prev => prev.filter(code => code.id !== id));
  };

  const handleAnswer = (selectedOption: number) => {
    if (selectedOption === questions[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(15);
    } else {
      setQuizComplete(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(15);
    setQuizComplete(false);
    setIsAuthenticated(false);
  };

  if (isAdmin) {
    return (
      <AdminPanel 
        inviteCodes={inviteCodes}
        onCreateCode={handleCreateCode}
        onDeleteCode={handleDeleteCode}
        onLogout={handleAdminLogout}
      />
    );
  }

  if (isAuthenticated) {
    if (quizComplete) {
      return (
        <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
          <div className="max-w-xl w-full">
            <ScoreBoard
              score={score}
              total={questions.length}
              onReset={handleResetQuiz}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="max-w-xl w-full">
          <QuizCard
            question={questions[currentQuestion]}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            timeLeft={timeLeft}
            onAnswer={handleAnswer}
          />
        </div>
      </div>
    );
  }

  return (
    <LandingPage 
      onInviteCodeSubmit={handleInviteCodeSubmit}
      onAdminLogin={handleAdminLogin}
      isAuthenticated={isAuthenticated}
      error={error}
    />
  );
}

export default App;