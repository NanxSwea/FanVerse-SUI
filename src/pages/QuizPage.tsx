import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const quizData = {
  dhoni: {
    question: "In which year did MS Dhoni lead India to World Cup victory?",
    options: ["2007", "2011", "2015", "2019"],
    correct: "2011"
  },
  bts: {
    question: "What year did BTS debut?",
    options: ["2011", "2012", "2013", "2014"],
    correct: "2013"
  },
  messi: {
    question: "How many Ballon d'Or awards has Messi won?",
    options: ["6", "7", "8", "9"],
    correct: "8"
  },
  taylor: {
    question: "Which was Taylor Swift's first album?",
    options: ["Fearless", "Taylor Swift", "Red", "1989"],
    correct: "Taylor Swift"
  },
  naruto: {
    question: "What is Naruto's signature jutsu?",
    options: ["Rasengan", "Chidori", "Shadow Clone", "Sage Mode"],
    correct: "Shadow Clone"
  }
};

export const QuizPage: React.FC = () => {
  const { fandomId } = useParams<{ fandomId: string }>();
  const navigate = useNavigate();
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const quiz = fandomId && quizData[fandomId as keyof typeof quizData];

  const handleAnswer = (answer: string) => {
    const correct = quiz?.correct === answer;
    setIsCorrect(correct);
    setAnswered(true);
    
    if (correct) {
      // TODO: Mint rare NFT
      setTimeout(() => navigate('/gallery'), 2000);
    }
  };

  if (!quiz) return <div>Invalid fandom selected</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">{quiz.question}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quiz.options.map((option) => (
            <button
              key={option}
              onClick={() => !answered && handleAnswer(option)}
              disabled={answered}
              className={`p-4 rounded-lg text-white font-medium transition-all duration-300 
                ${answered 
                  ? option === quiz.correct 
                    ? 'bg-green-500'
                    : 'bg-red-500 opacity-50'
                  : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {option}
            </button>
          ))}
        </div>
        {answered && (
          <div className={`mt-6 p-4 rounded-lg text-center ${isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            <p className="text-lg font-medium text-white">
              {isCorrect ? '🎉 Correct! Minting your rare NFT...' : '😔 Wrong answer. Try again!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};