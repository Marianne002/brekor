// components/QuizForm.jsx
"use client";
import React, { useRef, useState } from 'react';
import QuizResult from './QuizResult';

const QuizForm = () => {
  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef(null);

  const handleChange = (question, answer) => {
    if (!submitted) {
      setAnswers({
        ...answers,
        [question]: answer,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all questions are answered
    const allAnswered = Object.values(answers).every((answer) => answer);
    if (!allAnswered) {
      alert('Veuillez répondre à toutes les questions avant de soumettre.');
      return;
    }

    setSubmitted(true);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <h2>Questions du Quiz</h2>
      {/* Question 1 */}
      <div className="d-flex flex-column">
        <p>Quel type de sujets préférez-vous dans une œuvre d'art ?</p>
        <label>
          <input
            type="radio"
            name="q1"
            value="A"
            onChange={() => handleChange('q1', 'A')}
            disabled={submitted}
          />
          A) Paysages naturels et scènes de la vie quotidienne
        </label>
        <label>
          <input
            type="radio"
            name="q1"
            value="B"
            onChange={() => handleChange('q1', 'B')}
            disabled={submitted}
          />
          B) Rêves, fantasmes et scènes imaginaires
        </label>
        <label>
          <input
            type="radio"
            name="q1"
            value="C"
            onChange={() => handleChange('q1', 'C')}
            disabled={submitted}
          />
          C) Abstractions et formes géométriques
        </label>
        <label>
          <input
            type="radio"
            name="q1"
            value="D"
            onChange={() => handleChange('q1', 'D')}
            disabled={submitted}
          />
          D) Portraits réalistes et scènes historiques
        </label>
        <label>
          <input
            type="radio"
            name="q1"
            value="E"
            onChange={() => handleChange('q1', 'E')}
            disabled={submitted}
          />
          E) Expérimentations numériques et installations interactives
        </label>
      </div>

      {/* Question 2 */}
      <div className="d-flex flex-column">
        <p>Quelle palette de couleurs attire le plus votre attention ?</p>
        <label>
          <input
            type="radio"
            name="q2"
            value="A"
            onChange={() => handleChange('q2', 'A')}
            disabled={submitted}
          />
          A) Couleurs douces et naturelles
        </label>
        <label>
          <input
            type="radio"
            name="q2"
            value="B"
            onChange={() => handleChange('q2', 'B')}
            disabled={submitted}
          />
          B) Couleurs vives et contrastées
        </label>
        <label>
          <input
            type="radio"
            name="q2"
            value="C"
            onChange={() => handleChange('q2', 'C')}
            disabled={submitted}
          />
          C) Nuances monochromatiques et contrastes forts
        </label>
        <label>
          <input
            type="radio"
            name="q2"
            value="D"
            onChange={() => handleChange('q2', 'D')}
            disabled={submitted}
          />
          D) Couleurs réalistes et détails précis
        </label>
        <label>
          <input
            type="radio"
            name="q2"
            value="E"
            onChange={() => handleChange('q2', 'E')}
            disabled={submitted}
          />
          E) Couleurs variées et lumineuses, souvent en haute définition
        </label>
      </div>

      {/* Question 3 */}
      <div className="d-flex flex-column">
        <p>Comment décririez-vous votre approche de l'art ?</p>
        <label>
          <input
            type="radio"
            name="q3"
            value="A"
            onChange={() => handleChange('q3', 'A')}
            disabled={submitted}
          />
          A) Vous aimez les œuvres qui capturent la beauté du monde réel
        </label>
        <label>
          <input
            type="radio"
            name="q3"
            value="B"
            onChange={() => handleChange('q3', 'B')}
            disabled={submitted}
          />
          B) Vous êtes attiré par l'art qui stimule l'imagination et défie la réalité
        </label>
        <label>
          <input
            type="radio"
            name="q3"
            value="C"
            onChange={() => handleChange('q3', 'C')}
            disabled={submitted}
          />
          C) Vous appréciez l'art qui se concentre sur la forme et la composition
        </label>
        <label>
          <input
            type="radio"
            name="q3"
            value="D"
            onChange={() => handleChange('q3', 'D')}
            disabled={submitted}
          />
          D) Vous êtes fasciné par les représentations précises et détaillées
        </label>
        <label>
          <input
            type="radio"
            name="q3"
            value="E"
            onChange={() => handleChange('q3', 'E')}
            disabled={submitted}
          />
          E) Vous aimez les œuvres innovantes et avant-gardistes
        </label>
      </div>

      {/* Question 4 */}
      <div className="d-flex flex-column">
        <p>Quel est votre artiste préféré parmi ces choix ?</p>
        <label>
          <input
            type="radio"
            name="q4"
            value="A"
            onChange={() => handleChange('q4', 'A')}
            disabled={submitted}
          />
          A) Claude Monet
        </label>
        <label>
          <input
            type="radio"
            name="q4"
            value="B"
            onChange={() => handleChange('q4', 'B')}
            disabled={submitted}
          />
          B) Salvador Dalí
        </label>
        <label>
          <input
            type="radio"
            name="q4"
            value="C"
            onChange={() => handleChange('q4', 'C')}
            disabled={submitted}
          />
          C) Piet Mondrian
        </label>
        <label>
          <input
            type="radio"
            name="q4"
            value="D"
            onChange={() => handleChange('q4', 'D')}
            disabled={submitted}
          />
          D) Leonardo da Vinci
        </label>
        <label>
          <input
            type="radio"
            name="q4"
            value="E"
            onChange={() => handleChange('q4', 'E')}
            disabled={submitted}
          />
          E) Yayoi Kusama
        </label>
      </div>

      {/* Question 5 */}
      <div className="d-flex flex-column">
        <p>Quelle est votre réaction face à une œuvre d'art moderne et incomprise ?</p>
        <label>
          <input
            type="radio"
            name="q5"
            value="A"
            onChange={() => handleChange('q5', 'A')}
            disabled={submitted}
          />
          A) Vous préférez les œuvres classiques et compréhensibles
        </label>
        <label>
          <input
            type="radio"
            name="q5"
            value="B"
            onChange={() => handleChange('q5', 'B')}
            disabled={submitted}
          />
          B) Vous trouvez cela intrigant et captivant
        </label>
        <label>
          <input
            type="radio"
            name="q5"
            value="C"
            onChange={() => handleChange('q5', 'C')}
            disabled={submitted}
          />
          C) Vous êtes fasciné par l'originalité et la complexité
        </label>
        <label>
          <input
            type="radio"
            name="q5"
            value="D"
            onChange={() => handleChange('q5', 'D')}
            disabled={submitted}
          />
          D) Vous appréciez les détails et la précision
        </label>
        <label>
          <input
            type="radio"
            name="q5"
            value="E"
            onChange={() => handleChange('q5', 'E')}
            disabled={submitted}
          />
          E) Vous adorez l'innovation et les concepts nouveaux
        </label>
      </div>
      
      <button type="submit" disabled={submitted}>Soumettre</button>

      {submitted && <QuizResult answers={answers} />}
    </form>
  );
};

export default QuizForm;
