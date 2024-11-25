import React from 'react';
import { Trophy } from 'lucide-react';

interface ScoreBoardProps {
  team1Score: number;
  team2Score: number;
}

export default function ScoreBoard({ team1Score, team2Score }: ScoreBoardProps) {
  return (
    <div className="bg-blue-800 p-4 rounded-lg shadow-lg mb-6 flex flex-col items-center gap-4">      
      <div className="flex justify-center items-center gap-8">
        <div className="text-center">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="text-yellow-400" size={24} />
            <h3 className="text-white text-xl font-bold">Team 1</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-400">{team1Score}</p>
        </div>

        <div className="text-4xl font-bold text-white">VS</div>

        <div className="text-center">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="text-yellow-400" size={24} />
            <h3 className="text-white text-xl font-bold">Team 2</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-400">{team2Score}</p>
        </div>
      </div>
    </div>
  );
}