import React from 'react';

interface TeamSelectionProps {
  onSelect: (team: 1 | 2) => void;
}

export default function TeamSelection({ onSelect }: TeamSelectionProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
      <h2 className="text-3xl font-bold text-white mb-8">Select Team to Start</h2>
      
      <div className="flex gap-8">
        <button
          onClick={() => onSelect(1)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 px-8 rounded-lg transition-colors"
        >
          Team 1
        </button>
        
        <button
          onClick={() => onSelect(2)}
          className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-4 px-8 rounded-lg transition-colors"
        >
          Team 2
        </button>
      </div>
    </div>
  );
}