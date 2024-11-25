import React from 'react';
import type { Question } from '../data/questions';

interface BuzzerSelectionProps {
  team1Name: string;
  team2Name: string;
  onSelect: (team: 1 | 2) => void;
  question: Question;
}

export default function BuzzerSelection({ team1Name, team2Name, onSelect, question }: BuzzerSelectionProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
      <div className="bg-blue-900 text-white p-6 rounded-lg shadow-lg mb-8 max-w-2xl w-full mx-4">
        <h2 className="text-2xl font-bold text-center mb-4">{question.text}</h2>
      </div>
      
      <h3 className="text-3xl font-bold text-white mb-8">Who Won the Buzzer?</h3>
      
      <div className="flex gap-8">
        <button
          onClick={() => onSelect(1)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 px-8 rounded-lg transition-colors"
        >
          {team1Name}
        </button>
        
        <button
          onClick={() => onSelect(2)}
          className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-4 px-8 rounded-lg transition-colors"
        >
          {team2Name}
        </button>
      </div>
    </div>
  );
}