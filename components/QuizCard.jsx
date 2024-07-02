// components/QuizCard.jsx
"use client";
import "@styles/QuizCard.scss";
import React from 'react';

const QuizCard = ({ question, options, currentAnswer, handleChange, handleNext }) => {
  return (
    <div className="quiz-card mb-4 mx-auto">
      <div className="quiz-card-body">
        <label>{question}</label>
        {options.map((option, index) => (
            <label key={index} className="d-block">
            <input
              type="radio"
              name={question}
              value={option.value}
              onChange={() => handleChange(option.value)}
              checked={currentAnswer === option.value}
            />
            {option.label}
          </label>
        ))}
        <button className="btn-gradient mt-3" onClick={handleNext}>Suivant</button>
      </div>
    </div>
  );
};

export default QuizCard;
