import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save } from 'lucide-react';
import { Question } from '../../types';

interface QuestionTabProps {
  questions: Question[];
  onAddQuestion: (question: Question) => void;
  onDeleteQuestion: (id: string) => void;
  onEditQuestion: (question: Question) => void;
}

const QuestionTab: React.FC<QuestionTabProps> = ({
  questions,
  onAddQuestion,
  onDeleteQuestion,
  onEditQuestion,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correct: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.question.trim() && newQuestion.options.every(opt => opt.trim())) {
      onAddQuestion({
        ...newQuestion,
        id: Date.now().toString(),
      });
      setNewQuestion({
        question: '',
        options: ['', '', '', ''],
        correct: 0,
      });
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...newQuestion.options];
    newOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: newOptions });
  };

  const handleEdit = (question: Question) => {
    if (editingId === question.id) {
      setEditingId(null);
      onEditQuestion(question);
    } else {
      setEditingId(question.id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Question</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question
            </label>
            <input
              type="text"
              value={newQuestion.question}
              onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter question"
              required
            />
          </div>

          {newQuestion.options.map((option, index) => (
            <div key={index} className="flex gap-4 items-center">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Option {index + 1}
                </label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={`Enter option ${index + 1}`}
                  required
                />
              </div>
              <div className="flex items-end">
                <input
                  type="radio"
                  name="correct"
                  checked={newQuestion.correct === index}
                  onChange={() => setNewQuestion({ ...newQuestion, correct: index })}
                  className="w-5 h-5 mb-2 cursor-pointer accent-purple-500"
                />
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg
              flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Question
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Question List</h2>
        <div className="space-y-4">
          {questions.map((question) => (
            <div key={question.id} className="border rounded-lg p-4">
              {editingId === question.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => onEditQuestion({ ...question, question: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  {question.options.map((option, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...question.options];
                          newOptions[index] = e.target.value;
                          onEditQuestion({ ...question, options: newOptions });
                        }}
                        className="flex-1 px-4 py-2 border rounded-lg"
                      />
                      <input
                        type="radio"
                        name={`correct-${question.id}`}
                        checked={question.correct === index}
                        onChange={() => onEditQuestion({ ...question, correct: index })}
                        className="w-5 h-5 cursor-pointer accent-purple-500"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="text-lg font-medium mb-2">{question.question}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {question.options.map((option, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded ${
                          index === question.correct
                            ? 'bg-green-100 border-green-500'
                            : 'bg-gray-50'
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </>
              )}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(question)}
                  className="flex items-center gap-1 px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  {editingId === question.id ? (
                    <>
                      <Save className="w-4 h-4" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </>
                  )}
                </button>
                <button
                  onClick={() => onDeleteQuestion(question.id)}
                  className="flex items-center gap-1 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionTab;