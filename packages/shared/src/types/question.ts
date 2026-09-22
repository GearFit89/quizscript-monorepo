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



 export interface Question<Q= string, A= string, QuestT = "question" | "verse"> {
    id: number;
    flight?: string;
    book?: string;
    chapter?: number|string;
    ref: string
    question: Q;
    answer: A;
    type: QuestT
 }


export type BookRange = Record<string, number[]>