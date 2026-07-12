export const QUIZ_MONTHS = [
  { month: 'october', chapters: ['1', '2', '3', '4', '5'], book: 'Matthew' },
  { month: 'november', chapters: ['6', '7', '8', '9'], book: 'Matthew' },
  { month: 'december', chapters: ['10', '11', '12'], book: 'Matthew' },
  { month: 'january', chapters: ['13', '14'], book: 'Matthew' },
  { month: 'february', chapters: ['15', '16'], book: 'Matthew' },
  { month: 'march', chapters: ['Jonah'], book: 'Jonah' },
] as const;

export const QUESTION_TYPES = {
  FTV: 'ftv',
  QUOTE: 'quote',
  FTV_QUOTE: 'ftv/quote',
  ACCORDING_TO: 'According to',
  SQ: 'SQ:',
  NORMAL: 'question',
} as const;

export const USER_STATES = {
  CONNECTED: 'connected',
  QUIZZING: 'quizzing',
  ANSWERING: 'answering',
  WAITING: 'waiting',
  DISCONNECTED: 'disconnected',
} as const;

export const ROOM_STATES = {
  PENDING: 'pending',
  ACTIVE: 'active',
  DONE: 'done',
} as const;

export const DEFAULT_QUIZ_SETTINGS = {
  mode: 'quiz' as const,
  numQuestions: 20,
  lenOfTimer: 0,
  verseSelection: 'random' as const,
  flight: ['A', 'B', 'C', 'T'],
  type: ['ftv', 'quote', 'ftv/quote', 'According to', 'SQ:', 'question'],
};

export const ANSWER_CHECK_OPTIONS = {
  spellThreshold: 2,
  closeThreshold: 2,
  extraThreshold: 2,
  correction: true,
  isQuote: false,
};