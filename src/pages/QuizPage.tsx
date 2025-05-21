import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Timer, Award } from 'lucide-react';

const quizData = {
  dhoni: {
    questions: [
      {
        question: "In which year did MS Dhoni lead India to World Cup victory?",
        options: ["2007", "2011", "2015", "2019"],
        correct: "2011"
      },
      {
        question: "What was Dhoni's jersey number throughout his career?",
        options: ["5", "7", "10", "15"],
        correct: "7"
      },
      {
        question: "Which IPL team did Dhoni captain to multiple victories?",
        options: ["Mumbai Indians", "Chennai Super Kings", "Royal Challengers", "Kolkata Knight Riders"],
        correct: "Chennai Super Kings"
      }
    ]
  },
  bts: {
    questions: [
      {
        question: "What year did BTS debut?",
        options: ["2011", "2012", "2013", "2014"],
        correct: "2013"
      },
      {
        question: "Which BTS album featured 'Dynamite'?",
        options: ["BE", "Map of the Soul: 7", "Wings", "Love Yourself: Tear"],
        correct: "BE"
      },
      {
        question: "Who is the leader of BTS?",
        options: ["Jungkook", "V", "RM", "Suga"],
        correct: "RM"
      }
    ]
  },
  messi: {
    questions: [
      {
        question: "How many Ballon d'Or awards has Messi won?",
        options: ["6", "7", "8", "9"],
        correct: "8"
      },
      {
        question: "Which national team does Messi play for?",
        options: ["Brazil", "Spain", "Portugal", "Argentina"],
        correct: "Argentina"
      },
      {
        question: "In which year did Messi win the FIFA World Cup?",
        options: ["2014", "2018", "2022", "Never"],
        correct: "2022"
      }
    ]
  },
  taylor: {
    questions: [
      {
        question: "Which was Taylor Swift's first album?",
        options: ["Fearless", "Taylor Swift", "Red", "1989"],
        correct: "Taylor Swift"
      },
      {
        question: "What year was Taylor Swift born?",
        options: ["1987", "1988", "1989", "1990"],
        correct: "1989"
      },
      {
        question: "Which of these is NOT a Taylor Swift album?",
        options: ["Speak Now", "Reputation", "Harmony", "Folklore"],
        correct: "Harmony"
      }
    ]
  },
  naruto: {
    questions: [
      {
        question: "What is Naruto's signature jutsu?",
        options: ["Rasengan", "Chidori", "Shadow Clone", "Sage Mode"],
        correct: "Shadow Clone"
      },
      {
        question: "Who was Naruto's first teacher?",
        options: ["Kakashi", "Jiraiya", "Iruka", "Tsunade"],
        correct: "Iruka"
      },
      {
        question: "What is the name of the Nine-Tailed Fox?",
        options: ["Shukaku", "Kurama", "Matatabi", "Isobu"],
        correct: "Kurama"
      }
    ]
  }
};

export const QuizPage: React.FC = () => {
  const { fandomId } = useParams<{ fandomId: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const quiz = fandomId && quizData[fandomId as keyof typeof quizData];
  const currentQuizQuestion = quiz?.questions[currentQuestion];

  useEffect(() => {
    if (!isAnswered && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0 && !isAnswered) {
      handleTimeout();
    }
  }, [timeLeft, isAnswered]);

  const handleTimeout = () => {
    setIsAnswered(true);
    setTimeout(() => {
      if (currentQuestion < (quiz?.questions.length || 0) - 1) {
        nextQuestion();
      } else {
        finishQuiz();
      }
    }, 2000);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    if (currentQuizQuestion?.correct === answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < (quiz?.questions.length || 0) - 1) {
        nextQuestion();
      } else {
        finishQuiz();
      }
    }, 2000);
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setTimeLeft(30);
  };

  const finishQuiz = () => {
    // TODO: Mint NFT based on score
    navigate('/gallery');
  };

  if (!quiz || !currentQuizQuestion) return <div>Invalid fandom selected</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <Trophy className="h-6 w-6 text-yellow-400" />
                <span className="text-lg font-medium text-white">Score: {score}/{quiz.questions.length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Timer className="h-6 w-6 text-indigo-400" />
                <span className="text-lg font-medium text-white">{timeLeft}s</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-sm text-slate-400 text-right">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-8">{currentQuizQuestion.question}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuizQuestion.options.map((option) => {
                const isCorrect = currentQuizQuestion.correct === option;
                const isSelected = selectedAnswer === option;
                
                return (
                  <motion.button
                    key={option}
                    onClick={() => !isAnswered && handleAnswer(option)}
                    disabled={isAnswered}
                    whileHover={!isAnswered ? { scale: 1.02 } : {}}
                    className={`p-4 rounded-xl text-white font-medium transition-all duration-300 
                      ${isAnswered
                        ? isCorrect
                          ? 'bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/20'
                          : isSelected
                            ? 'bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/20'
                            : 'bg-slate-800/50 opacity-50'
                        : 'glass-card hover:shadow-lg hover:shadow-indigo-500/20'
                      }`}
                  >
                    <span className="flex items-center justify-between">
                      {option}
                      {isAnswered && isCorrect && (
                        <Award className="h-5 w-5 text-yellow-300" />
                      )}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-4 rounded-xl text-center ${
                  selectedAnswer === currentQuizQuestion.correct
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-red-500/20 text-red-300'
                }`}
              >
                <p className="text-lg font-medium">
                  {selectedAnswer === currentQuizQuestion.correct
                    ? '🎉 Correct! Keep going!'
                    : '😔 Wrong answer. The correct answer was: ' + currentQuizQuestion.correct}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};