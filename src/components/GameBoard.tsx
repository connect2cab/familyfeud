import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Question } from '../data/questions';
import TeamSelection from './TeamSelection';
import TransitionPage from './TransitionPage';

interface GameBoardProps {
  question: Question;
  onNextQuestion: () => void;
  onScoreUpdate: (points: number, team: 1 | 2) => void;
}

export default function GameBoard({ 
  question, 
  onNextQuestion, 
  onScoreUpdate
}: GameBoardProps) {
  const [revealedAnswers, setRevealedAnswers] = useState<boolean[]>(
    new Array(question.answers.length).fill(false)
  );
  const [strikes, setStrikes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<1 | 2 | null>(null);
  const [isTeamSwitch, setIsTeamSwitch] = useState(false);
  const [winningTeam, setWinningTeam] = useState<1 | 2 | null>(null);
  const [audio] = useState(new Audio('https://assets.mixkit.co/active_storage/sfx/952/952-preview.mp3'));
  const [showTeamSelection, setShowTeamSelection] = useState(true);
  const [revealIndex, setRevealIndex] = useState<number | null>(null);
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    setRevealedAnswers(new Array(question.answers.length).fill(false));
    setStrikes(0);
    setGameOver(false);
    setCurrentTeam(null);
    setIsTeamSwitch(false);
    setWinningTeam(null);
    setShowTeamSelection(true);
    setRevealIndex(null);
    setShowTransition(false);
  }, [question]);

  const handleTeamSelect = (team: 1 | 2) => {
    setCurrentTeam(team);
    setShowTeamSelection(false);
  };

  const calculateTotalPoints = () => {
    return question.answers.reduce((sum, answer, index) => {
      if (revealedAnswers[index]) {
        return sum + answer.points;
      }
      return sum;
    }, 0);
  };

  const handleWin = (team: 1 | 2, points: number) => {
    setWinningTeam(team);
    setGameOver(true);
    onScoreUpdate(points, team);
  };

  useEffect(() => {
    if (gameOver || isTeamSwitch || !currentTeam || showTeamSelection) return;
    
    const handleKeyPress = (event: KeyboardEvent) => {
      const num = parseInt(event.key);
      if (num >= 1 && num <= question.answers.length && !revealedAnswers[num - 1]) {
        const newRevealed = [...revealedAnswers];
        newRevealed[num - 1] = true;
        setRevealedAnswers(newRevealed);
        
        if (newRevealed.every(answer => answer)) {
          handleWin(currentTeam, calculateTotalPoints());
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    question.answers.length, revealedAnswers, currentTeam, onScoreUpdate,
    question.answers, gameOver, isTeamSwitch, showTeamSelection
  ]);

  const handleStrike = () => {
    if (gameOver || !currentTeam) return;
    
    audio.play();
    
    if (strikes < 2) {
      setStrikes(strikes + 1);
    } else {
      handleWin(currentTeam === 1 ? 2 : 1, calculateTotalPoints());
    }
  };

  useEffect(() => {
    if (!gameOver || revealIndex !== null) return;

    const unrevealedIndexes = revealedAnswers
      .map((revealed, index) => revealed ? -1 : index)
      .filter(index => index !== -1);

    if (unrevealedIndexes.length > 0) {
      const timer = setTimeout(() => {
        setRevealIndex(unrevealedIndexes[0]);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowTransition(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [gameOver, revealIndex, revealedAnswers]);

  useEffect(() => {
    if (revealIndex === null) return;

    const timer = setTimeout(() => {
      setRevealedAnswers(prev => {
        const newRevealed = [...prev];
        newRevealed[revealIndex] = true;
        return newRevealed;
      });
      setRevealIndex(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [revealIndex]);

  if (showTransition && winningTeam) {
    return (
      <TransitionPage
        onComplete={onNextQuestion}
        winningTeam={winningTeam}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-blue-900 text-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-center mb-4">{question.text}</h2>
      </div>

      {showTeamSelection && (
        <TeamSelection onSelect={handleTeamSelect} />
      )}

      {!showTeamSelection && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {question.answers.map((answer, index) => (
              <button
                key={index}
                className={`h-16 rounded-lg shadow-lg text-xl font-bold transition-all duration-300 ${
                  revealedAnswers[index]
                    ? 'bg-green-500 text-white'
                    : revealIndex === index
                    ? 'bg-yellow-500 text-transparent animate-pulse'
                    : 'bg-gray-700 text-transparent'
                }`}
              >
                {revealedAnswers[index] ? `${answer.text} (${answer.points})` : index + 1}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    i < strikes ? 'bg-red-600' : 'bg-gray-300'
                  }`}
                >
                  {i < strikes && <X className="text-white" size={24} />}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="text-xl font-bold text-white bg-blue-600 px-4 py-2 rounded">
                Team {currentTeam}'s Turn
              </div>
              <button
                onClick={handleStrike}
                disabled={gameOver}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-xl font-bold transition-colors disabled:opacity-50"
              >
                Strike!
              </button>
            </div>
          </div>
        </>
      )}

      {winningTeam && !showTransition && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white text-center py-4 text-xl font-bold">
          Team {winningTeam} Wins!
        </div>
      )}
    </div>
  );
}