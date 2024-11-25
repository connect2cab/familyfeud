import React, { useState } from 'react';

interface TeamSetupProps {
  onComplete: (names: { team1: string; team2: string }) => void;
}

export default function TeamSetup({ onComplete }: TeamSetupProps) {
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (team1Name.trim() && team2Name.trim()) {
      onComplete({
        team1: team1Name.trim(),
        team2: team2Name.trim()
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
        Enter Team Names
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="team1" className="block text-sm font-medium text-gray-700 mb-2">
            Team 1 Name
          </label>
          <input
            type="text"
            id="team1"
            value={team1Name}
            onChange={(e) => setTeam1Name(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Enter Team 1 name"
          />
        </div>
        <div>
          <label htmlFor="team2" className="block text-sm font-medium text-gray-700 mb-2">
            Team 2 Name
          </label>
          <input
            type="text"
            id="team2"
            value={team2Name}
            onChange={(e) => setTeam2Name(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Enter Team 2 name"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors"
        >
          Start Game
        </button>
      </form>
    </div>
  );
}