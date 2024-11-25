import React, { useState } from 'react';
import { getRandomQuestion, resetQuestions, getTotalRounds, getCurrentRound } from './data/questions';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import TransitionPage from './components/TransitionPage';
import FinalScore from './components/FinalScore';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(() => getRandomQuestion());
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [showTransition, setShowTransition] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const handleNextQuestion = () => {
    setShowTransition(true);
  };

  const handleTransitionComplete = () => {
    try {
      const nextQuestion = getRandomQuestion();
      setCurrentQuestion(nextQuestion);
      setShowTransition(false);
    } catch (error) {
      setGameFinished(true);
      resetQuestions();
    }
  };

  const handleScoreUpdate = (points: number, team: 1 | 2) => {
    if (team === 1) {
      setTeam1Score(prev => prev + points);
    } else {
      setTeam2Score(prev => prev + points);
    }
  };

  const handleRestart = () => {
    setGameStarted(false);
    setTeam1Score(0);
    setTeam2Score(0);
    setGameFinished(false);
    resetQuestions();
    setCurrentQuestion(getRandomQuestion());
  };

  if (!gameStarted) {
    return (
      <div 
        onClick={() => setGameStarted(true)}
        className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex items-center justify-center cursor-pointer"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white text-center animate-pulse">
          Portage Family Feud
        </h1>
      </div>
    );
  }

  if (gameFinished) {
    return (
      <FinalScore 
        team1Score={team1Score} 
        team2Score={team2Score} 
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 py-8">
      <ScoreBoard 
        team1Score={team1Score} 
        team2Score={team2Score}
        roundCount={getCurrentRound()}
        totalRounds={getTotalRounds()}
      />
      <GameBoard 
        question={currentQuestion}
        onNextQuestion={handleNextQuestion}
        onScoreUpdate={handleScoreUpdate}
      />
      {showTransition && <TransitionPage onComplete={handleTransitionComplete} />}
    </div>
  );
}

export default App;