// Card levels and their review intervals (in hours)
export const CARD_LEVELS = {
  NEW: 1,
  LEARNING: 2,
  MASTERED: 3
};

// Sample flashcards with initial state
export const SAMPLE_CARDS = [
  {
    id: 1,
    question: "What is React?",
    answer: "A JavaScript library for building user interfaces",
    level: CARD_LEVELS.NEW,
    lastReviewed: null,
    reviewCount: 0
  },
  {
    id: 2,
    question: "What is JSX?",
    answer: "A syntax extension for JavaScript that lets you write HTML-like code in JavaScript",
    level: CARD_LEVELS.NEW,
    lastReviewed: null,
    reviewCount: 0
  },
  {
    id: 3,
    question: "What is a component in React?",
    answer: "A reusable piece of UI that can contain both logic and presentation",
    level: CARD_LEVELS.NEW,
    lastReviewed: null,
    reviewCount: 0
  },
  {
    id: 4,
    question: "What is the Virtual DOM?",
    answer: "A lightweight copy of the actual DOM that React uses to optimize rendering performance",
    level: CARD_LEVELS.NEW,
    lastReviewed: null,
    reviewCount: 0
  },
  {
    id: 5,
    question: "What is state in React?",
    answer: "An object that stores a component's dynamic data and determines the component's behavior",
    level: CARD_LEVELS.NEW,
    lastReviewed: null,
    reviewCount: 0
  },
  {
    id: 6,
    question: "What is props in React?",
    answer: "Properties passed to a component that are read-only and cannot be modified",
    level: CARD_LEVELS.NEW,
    lastReviewed: null,
    reviewCount: 0
  },
  {
    id: 7,
    question: "What is useEffect?",
    answer: "A React Hook that lets you synchronize a component with external systems",
    level: CARD_LEVELS.NEW,
    lastReviewed: null,
    reviewCount: 0
  },
  {
    id: 8,
    question: "What is useState?",
    answer: "A React Hook that lets you add state to functional components",
    level: CARD_LEVELS.NEW,
    lastReviewed: null,
    reviewCount: 0
  },
  {
    id: 9,
    question: "What is Redux?",
    answer: "A predictable state container for JavaScript applications",
    level: CARD_LEVELS.NEW,
    lastReviewed: null,
    reviewCount: 0
  },
  {
    id: 10,
    question: "What is React Router?",
    answer: "A library for handling routing in React applications",
    level: CARD_LEVELS.NEW,
    lastReviewed: null,
    reviewCount: 0
  },
  {
    id: 11,
    question: "What is Context API?",
    answer: "A React feature that provides a way to pass data through the component tree without prop drilling",
    level: CARD_LEVELS.NEW,
    lastReviewed: null,
    reviewCount: 0
  },
  {
    id: 12,
    question: "What is a Higher-Order Component (HOC)?",
    answer: "A function that takes a component and returns a new component with additional functionality",
    level: CARD_LEVELS.NEW,
    lastReviewed: null,
    reviewCount: 0
  },
  {
    id: 13,
    question: "What is React.memo?",
    answer: "A higher-order component that memoizes a component to prevent unnecessary re-renders",
    level: CARD_LEVELS.NEW,
    lastReviewed: null,
    reviewCount: 0
  },
  {
    id: 14,
    question: "What is the difference between controlled and uncontrolled components?",
    answer: "Controlled components have their state managed by React, while uncontrolled components maintain their own state",
    level: CARD_LEVELS.NEW,
    lastReviewed: null,
    reviewCount: 0
  },
  {
    id: 15,
    question: "What is React.lazy?",
    answer: "A function that lets you load components lazily, improving initial load performance",
    level: CARD_LEVELS.NEW,
    lastReviewed: null,
    reviewCount: 0
  }
]; 