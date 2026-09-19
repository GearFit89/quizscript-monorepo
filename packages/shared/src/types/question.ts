import { BIBLE_BOOKS } from "../utils";

export interface QuestionFilters {
    category?: string;
    tags?: string[];
    limit?: number;
    months: string[]; // TODO: Add some months quizType
    chapters: Partial<Record<BibleKey, string[]|undefined>>
    questionType: string[];
    questionDifficulty: string[];
    flights: string[];
    selectedBook?: BibleKey
}


 export type BibleKey = keyof typeof BIBLE_BOOKS