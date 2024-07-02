// components/QuizResult.jsx
"use client";
import "@styles/QuizCard.scss";
import React from 'react';

const QuizResult = ({ answers }) => {
  const calculateResult = () => {
    // Check if answers are provided
    if (!answers) return '';

    // Calcul number of answers for each category
    const counts = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
    };

    Object.values(answers).forEach((answer) => {
      counts[answer]++;
    });

    // Determine the category with the most answers
    const result = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));

    return result;
  };

  const getResultText = () => {
    const result = calculateResult();

    switch (result) {
      case 'A':
        return 'Impressionnisme : Vous êtes attiré par les œuvres qui capturent la lumière et la nature avec des coups de pinceau doux et des couleurs naturelles.';
      case 'B':
        return 'Surréalisme : Vous aimez l\'art qui défie la réalité et explore le subconscient avec des images oniriques et fantastiques.';
      case 'C':
        return 'Abstraction : Vous appréciez les formes géométriques et les compositions non figuratives qui mettent l\'accent sur l\'esthétique pure.';
      case 'D':
        return 'Renaissance/Réalisme : Vous êtes un adepte du réalisme ou de la Renaissance, admirant les œuvres détaillées et précises qui représentent fidèlement la réalité.';
      case 'E':
        return 'Art Contemporain : Vous aimez les œuvres innovantes, interactives et souvent numériques qui repoussent les limites de l\'art traditionnel.';
      default:
        return '';
    }
  };

  return (
    <div className="gradient-border-all quiz-card mb-4">
      <div className="card-body">
        <h2>Résultat du Quiz</h2>
        <span>{getResultText()}</span>
      </div>
    </div>
  );
};

export default QuizResult;
