import React from 'react';
import QuizComponent from './QuizComponent';
import './QuizComponent.css';

const QuizPage: React.FC = () => {
  return (
    <div className="quiz-page">
      <h1>Quiz sur la Protection des Océans</h1>
      <QuizComponent />
    </div>
  );
};

export default QuizPage;
