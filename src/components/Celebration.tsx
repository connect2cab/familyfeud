import React from 'react';

const celebrationGifs = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDd6Y2E3OWF1Y3E2OWsyeWx0NnB4NXgybzNxbTNyY2t1aHdqY2lxdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKDxSkF9iGiCJby/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWRnOWM5MWx5ZnJxbXd0ZDdwbWd2NmRxbXBxdWx6ZWd0ZmRyYnR6aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/artj92V8o75VPL7AeQ/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWRqcWRyOWRyZnBqbmJyeWJyNmN3ZWd5ZnBxdnBxbmJyeWJyNmN3ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26u4cqiYI30juCOGY/giphy.gif"
];

interface CelebrationProps {
  teamNumber: number;
}

export default function Celebration({ teamNumber }: CelebrationProps) {
  const randomGif = celebrationGifs[Math.floor(Math.random() * celebrationGifs.length)];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
      <img 
        src={randomGif} 
        alt="Celebration" 
        className="w-96 h-96 object-contain mb-8"
      />
      <h2 className="text-5xl font-bold text-white text-center mb-8 animate-bounce">
        Team {teamNumber} Wins!
      </h2>
      <p className="text-2xl text-yellow-400 animate-pulse">
        Get ready for the next question...
      </p>
    </div>
  );
}