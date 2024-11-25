import React from 'react';
import { Trophy, RefreshCw } from 'lucide-react';

interface FinalScoreProps {
  team1Score: number;
  team2Score: number;
  onRestart: () => void;
}

export default function FinalScore({ team1Score, team2Score, onRestart }: FinalScoreProps) {
  const winningTeam = team1Score > team2Score ? 1 : 2;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-blue-700 flex flex-col items-center justify-center z-50">
      <Trophy className="text-yellow-400 w-24 h-24 mb-8" />
      
      <h2 className="text-5xl font-bold text-white text-center mb-12">
        Final Scores
      </h2>

      <div className="flex gap-16 items-center mb-12">
        <div className="text-center">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="text-yellow-400" size={32} />
            <h3 className="text-white text-3xl font-bold">Team 1</h3>
          </div>
          <p className="text-5xl font-bold text-yellow-400">{team1Score}</p>
        </div>

        <div className="text-6xl font-bold text-white">VS</div>

        <div className="text-center">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="text-yellow-400" size={32} />
            <h3 className="text-white text-3xl font-bold">Team 2</h3>
          </div>
          <p className="text-5xl font-bold text-yellow-400">{team2Score}</p>
        </div>
      </div>

      <div className="text-center bg-blue-800 p-8 rounded-lg shadow-lg mb-8">
        <h3 className="text-3xl font-bold text-white mb-4">
          Team {winningTeam} Advances to the Final Round!
        </h3>
        <p className="text-xl text-yellow-400">
          Congratulations on an amazing game!
        </p>
      </div>

      <button
        onClick={onRestart}
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold 
                 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
      >
        Play Again
        <RefreshCw />
      </button>
    </div>
  );
}