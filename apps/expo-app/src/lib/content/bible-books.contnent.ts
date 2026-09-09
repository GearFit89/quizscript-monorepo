
export const BIBLE_BOOKS: Record<string, { chps: number }> = {
  Matthew: { chps: 28 },
  Mark: { chps: 16 },
  Luke: { chps: 24 },
  John: { chps: 21 },
};


export const getChapters = (bookName: keyof typeof BIBLE_BOOKS) => Array.from({ length: BIBLE_BOOKS})