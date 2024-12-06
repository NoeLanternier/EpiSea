"use client";

import React, { useState } from 'react';
import { questions } from './questions';
import './QuizComponent.css';



const QuizComponent: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [answered, setAnswered] = useState(false);

  const handleAnswerOptionClick = (answer: string) => {
    if (answered) return;

    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestion].answer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    setUserAnswers([...userAnswers, answer]);
    setAnswered(true);

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setAnswered(false);
      } else {
        setShowScore(true);
      }
    }, 650);
  };

  return (
    <div className="quiz-component">
      {showScore ? (
        <>
          <div className="score-section">
            <p>Vous avez obtenu <span className="score">{score}</span> sur {questions.length}</p>
          </div>
          <button className="show-answers-button" onClick={() => setShowAnswers(true)}>Réponses</button>
        </>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">{questions[currentQuestion].question}</div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option)}
                className={
                  selectedAnswer === option
                    ? isCorrect
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
      {showAnswers && (
        <div className="answers-summary">
          {questions.map((question, index) => (
            <div key={index} className="answer-summary">
              <p className="questions">{question.question}</p>
              <p className="good-answers">
                Votre réponse : <span className={userAnswers[index] === question.answer ? 'correct-answer' : 'incorrect-answer'}>{userAnswers[index]}</span>. Bonne réponse : <span className='good-answer'>{question.answer}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizComponent;