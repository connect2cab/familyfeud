export interface Answer {
  text: string;
  points: number;
}

export interface Question {
  text: string;
  answers: Answer[];
}

export const questions: Question[] = [
  {
    text: "Name something snowmen might have nightmares about.",
    answers: [
      { text: "Sun/Beach Weather", points: 62 },
      { text: "Fire/Flame Throwers", points: 14 },
      { text: "Blow Dryers", points: 8 },
      { text: "Rain", points: 7 },
      { text: "Snowplow/Shovel", points: 5 },
      { text: "Drought", points: 3 },
      { text: "Snowballs", points: 2 },
      { text: "Peeing Dogs/Pee", points: 1 }
    ]
  },
  {
    text: "Name a place you stop going to when you're broke.",
    answers: [
      { text: "Restaurants", points: 32 },
      { text: "Store/mall", points: 17 },
      { text: "Bar/nightclub", points: 16 },
      { text: "Casino", points: 15 },
      { text: "The movies", points: 8 },
      { text: "The bank", points: 4 },
      { text: "Ball game", points: 2 },
      { text: "Racetrack", points: 3 }
    ]
  },
  {
    text: "Name something people swap.",
    answers: [
      { text: "Clothes/Shoes", points: 23 },
      { text: "Phone Numbers", points: 20 },
      { text: "Stories/Gossip", points: 19 },
      { text: "Spit/Germs", points: 14 },
      { text: "Books", points: 11 },
      { text: "Recipes", points: 8 }
    ]
  },
  {
    text: "Name an animal that's easy to imitate in charades.",
    answers: [
      { text: "Monkey/ape", points: 32 },
      { text: "Dog", points: 21 },
      { text: "Cat", points: 16 },
      { text: "Bird", points: 14 },
      { text: "Elephant", points: 4 },
      { text: "Kangaroo", points: 4 },
      { text: "Rabbit", points: 4 }
    ]
  },
  {
    text: "Name the lumpiest part of your body.",
    answers: [
      { text: "Belly", points: 44 },
      { text: "Rump", points: 16 },
      { text: "Thigh", points: 10 },
      { text: "Chest", points: 9 },
      { text: "Arms", points: 6 },
      { text: "Hips", points: 5 }
    ]
  },
  {
    text: "There is a dead body in the house. What do you do with it?",
    answers: [
      { text: "Bury it", points: 28 },
      { text: "Hide it in the fridge", points: 18 },
      { text: "Call cops anyway", points: 11 },
      { text: "Leave it/don't touch", points: 10 },
      { text: "Burn it", points: 9 },
      { text: "Take to neighbor's", points: 7 },
      { text: "Toss in lake", points: 5 },
      { text: "Trash/dumpster", points: 5 }
    ]
  },
  {
    text: "Name something you'd wish grew on trees.",
    answers: [
      { text: "Money", points: 35 },
      { text: "Pizza", points: 25 },
      { text: "Chocolate", points: 20 },
      { text: "Clean laundry", points: 10 },
      { text: "Wi-Fi signals", points: 5 }
    ]
  },
  {
    text: "Name something you'd hate to discover had expired.",
    answers: [
      { text: "Driver's license", points: 37 },
      { text: "Milk", points: 18 },
      { text: "Credit card", points: 12 },
      { text: "Insurance", points: 7 },
      { text: "Car registration", points: 5 },
      { text: "My own life", points: 3 }
    ]
  },
  {
    text: "Name something people have less of as they get older.",
    answers: [
      { text: "Hair", points: 40 },
      { text: "Energy", points: 12 },
      { text: "Teeth", points: 9 },
      { text: "Appetite", points: 9 },
      { text: "Patience", points: 7 }
    ]
  },
  {
    text: "What would you do if you saw a ghost?",
    answers: [
      { text: "Scream", points: 42 },
      { text: "Talk To It", points: 24 },
      { text: "Run", points: 18 },
      { text: "Pray", points: 4 },
      { text: "Faint", points: 3 },
      { text: "Pinch Myself", points: 3 }
    ]
  },
  {
    text: "Name a complaint people have about hospitals.",
    answers: [
      { text: "Food", points: 29 },
      { text: "Wait", points: 16 },
      { text: "Cost", points: 14 },
      { text: "Smell", points: 12 },
      { text: "Service", points: 10 },
      { text: "Nurses", points: 4 }
    ]
  },
  {
    text: "Name something that can ruin dinner.",
    answers: [
      { text: "Burnt food", points: 37 },
      { text: "Phone call", points: 11 },
      { text: "Fight", points: 9 },
      { text: "Snacking before", points: 7 },
      { text: "Hair in food", points: 6 },
      { text: "Guest is late", points: 4 }
    ]
  },
  {
    text: "Name a noise that people can't prevent themselves from making.",
    answers: [
      { text: "Burp", points: 29 },
      { text: "Sneeze", points: 26 },
      { text: "Snore", points: 17 },
      { text: "Passing Gas", points: 10 },
      { text: "Hiccup", points: 9 },
      { text: "Cough", points: 4 }
    ]
  }
];

let usedQuestions = new Set<number>();

export const resetQuestions = () => {
  usedQuestions.clear();
};

export const getRandomQuestion = (): Question => {
  if (usedQuestions.size === questions.length) {
    throw new Error("All questions have been used");
  }

  let availableIndices = Array.from(Array(questions.length).keys())
    .filter(index => !usedQuestions.has(index));
  
  let randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  usedQuestions.add(randomIndex);
  
  return questions[randomIndex];
};

export const getTotalRounds = () => questions.length;
export const getCurrentRound = () => usedQuestions.size;