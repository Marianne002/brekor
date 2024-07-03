// components/QuizCard.jsx
"use client";
import "@styles/QuizCard.scss";
import React from 'react';

const QuizCard = ({ question, options, currentAnswer, handleChange, handleNext, handlePrev, currentStep }) => {
  return (
    <div className="gradient-border-all-rounder quiz-card mb-4 mx-auto">
      <div className="quiz-card-body">
        <label className="quiz-question">{question}</label>
        {options.map((option, index) => (
          <label
            key={index}
            className={`d-block option-label ${currentAnswer === option.value ? 'selected' : ''}`}
          >
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
        <div className={`mt-3 ${currentStep > 1 ? 'd-flex justify-content-between' : 'text-end'}`}>
          {currentStep > 1 && (
            <button className="btn btn-pink" onClick={handlePrev}>Précédent</button>
          )}
          <button className="btn btn-pink" onClick={handleNext}>Suivant</button>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
