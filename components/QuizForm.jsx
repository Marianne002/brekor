// components/QuizForm.jsx
"use client";
import React, { useState } from 'react';
import QuizResult from './QuizResult';
import QuizCard from './QuizCard';

const QuizForm = () => {
  const questions = [
    {
      question: 'Quel type de sujets préférez-vous dans une œuvre d\'art ?',
      options: [
        { value: 'A', label: 'Paysages naturels et scènes de la vie quotidienne' },
        { value: 'B', label: 'Rêves, fantasmes et scènes imaginaires' },
        { value: 'C', label: 'Abstractions et formes géométriques' },
        { value: 'D', label: 'Portraits réalistes et scènes historiques' },
        { value: 'E', label: 'Expérimentations numériques et installations interactives' },
      ],
      key: 'q1',
    },
    {
      question: 'Quelle palette de couleurs attire le plus votre attention ?',
      options: [
        { value: 'A', label: 'Couleurs douces et naturelles' },
        { value: 'B', label: 'Couleurs vives et contrastées' },
        { value: 'C', label: 'Nuances monochromatiques et contrastes forts' },
        { value: 'D', label: 'Couleurs réalistes et détails précis' },
        { value: 'E', label: 'Couleurs variées et lumineuses, souvent en haute définition' },
      ],
      key: 'q2',
    },
    {
      question: 'Comment décririez-vous votre approche de l\'art ?',
      options: [
        { value: 'A', label: 'Vous aimez les œuvres qui capturent la beauté du monde réel' },
        { value: 'B', label: 'Vous êtes attiré par l\'art qui stimule l\'imagination et défie la réalité' },
        { value: 'C', label: 'Vous appréciez l\'art qui se concentre sur la forme et la composition' },
        { value: 'D', label: 'Vous êtes fasciné par les représentations précises et détaillées' },
        { value: 'E', label: 'Vous aimez les œuvres innovantes et avant-gardistes' },
      ],
      key: 'q3',
    },
    {
      question: 'Quel est votre artiste préféré parmi ces choix ?',
      options: [
        { value: 'A', label: 'Claude Monet' },
        { value: 'B', label: 'Salvador Dalí' },
        { value: 'C', label: 'Piet Mondrian' },
        { value: 'D', label: 'Leonardo da Vinci' },
        { value: 'E', label: 'Yayoi Kusama' },
      ],
      key: 'q4',
    },
    {
      question: 'Quelle est votre réaction face à une œuvre d\'art moderne et incomprise ?',
      options: [
        { value: 'A', label: 'Vous préférez les œuvres classiques et compréhensibles' },
        { value: 'B', label: 'Vous trouvez cela intrigant et captivant' },
        { value: 'C', label: 'Vous êtes fasciné par l\'originalité et la complexité' },
        { value: 'D', label: 'Vous appréciez les détails et la précision' },
        { value: 'E', label: 'Vous adorez l\'innovation et les concepts nouveaux' },
      ],
      key: 'q5',
    },
  ];

  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (answer) => {
    if (!submitted) {
      setAnswers({
        ...answers,
        [questions[currentStep - 1].key]: answer,
      });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (!answers[questions[currentStep - 1].key]) {
      alert('Veuillez répondre à la question avant de continuer.');
    } else if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <form>
      {!submitted ? (
        currentStep === 0 ? (
          <div className="quiz-card mb-4">
            <div className="quiz-card-body d-flex flex-column">
              <h2>A vous de jouez !</h2>
              <button className="btn-gradient mt-3" onClick={handleNext}>Commencer le Quiz</button>
            </div>
          </div>
        ) : (
          <QuizCard
            question={questions[currentStep - 1].question}
            options={questions[currentStep - 1].options}
            currentAnswer={answers[questions[currentStep - 1].key]}
            handleChange={handleChange}
            handleNext={handleNext}
          />
        )
      ) : (
        <QuizResult answers={answers} />
      )}
    </form>
  );
};

export default QuizForm;
