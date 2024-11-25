import React, { useState } from 'react';
import type { Question } from '../data/questions';

interface FirstAnswersProps {
  question: Question;
  team1Name: string;
  team2Name: string;
  buzzerWinner: 1 | 2;
  onComplete: (team1Points: number, team2Points: number) => void;
}

export default function FirstAnswers({ 
  question, 
  team1Name, 
  team2Name, 
  buzzerWinner,
  onComplete 
}: FirstAnswersProps) {
  const [currentTeam, setCurrentTeam] = useState<1 | 2>(buzzerWinner);
  const [team1Answer, setTeam1Answer] = useState<number | null>(null);
  const [team2Answer, setTeam2Answer] = useState<number | null>(null);

  const handleAnswerSelect = (answerIndex: number) => {
    const points = question.answers[answerIndex].points;
    
    if (currentTeam === 1) {
      setTeam1Answer(points);
      setCurrentTeam(2);
    } else {
      setTeam2Answer(points);
      onComplete(team1Answer || 0, points);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
      <div className="bg-blue-900 text-white p-6 rounded-lg shadow-lg mb-8 max-w-2xl w-full mx-4">
        <h2 className="text-2xl font-bold text-center mb-4">{question.text}</h2>
      </div>

      <h3 className="text-3xl font-bold text-white mb-8">
        {currentTeam === 1 ? team1Name : team2Name}'s Turn
      </h3>

      <div className="grid grid-cols-2 gap-4 max-w-4xl w-full mx-4">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-bold py-4 px-6 rounded-lg transition-colors"
            disabled={team1Answer !== null && currentTeam === 1}
          >
            {answer.text} ({answer.points})
          </button>
        ))}
      </div>
    </div>
  );
}