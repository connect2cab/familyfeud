import React from 'react';
import { ArrowRight } from 'lucide-react';

interface TransitionPageProps {
  onComplete: () => void;
  winningTeam: 1 | 2;
}

export default function TransitionPage({ onComplete, winningTeam }: TransitionPageProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-blue-700 flex flex-col items-center justify-center z-50">
      <h2 className="text-4xl font-bold text-white text-center mb-4">
        Team {winningTeam} Won This Round!
      </h2>
      
      <h3 className="text-2xl text-yellow-400 mb-12">Ready for the Next Question?</h3>
      
      <button
        onClick={onComplete}
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold 
                 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
      >
        Next Question
        <ArrowRight />
      </button>
    </div>
  );
}