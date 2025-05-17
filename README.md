# Spaced Repetition Flashcard Engine

A React-based flashcard application that implements spaced repetition learning to help users memorize information more effectively. Built for a hackathon submission.

![Spaced Repetition Flashcard Engine]([(https://spaced-repetition-flashcard-engine.vercel.app/flashcards)])

## Features

- Interactive flashcard interface with smooth flip animations
- Spaced repetition algorithm with three learning levels
- Progress tracking with statistics and visual feedback
- Dark mode support
- Review history tracking
- Local storage persistence
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion

## Tech Stack

- React 18
- Tailwind CSS
- Framer Motion
- Local Storage API

## Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/spaced-repetition-flashcard-engine.git
cd spaced-repetition-flashcard-engine
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Usage

- Click on a card to flip it and see the answer
- Use the buttons to mark your knowledge level for each card
- Track your progress with achievements and statistics
- Your progress is automatically saved in your browser's local storage

## License

MIT

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd spaced-repetition-flashcards
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Deployment

The app is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with default settings

## Usage

1. Click on a card to flip it and reveal the answer
2. Click "Know" if you remembered the answer correctly
3. Click "Don't Know" if you need more practice
4. Track your progress with the statistics panel
5. Use the dark mode toggle for comfortable viewing
6. View your recent review history
7. Shuffle cards for a fresh order
8. Reset progress if needed

## Spaced Repetition Algorithm

- Cards start at Level 1 (New)
- Correct answers move cards to the next level
- Incorrect answers reset cards to Level 1
- Level 3 cards are considered "Mastered"
- Progress is saved automatically

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for your own hackathon submissions or learning purposes. 
