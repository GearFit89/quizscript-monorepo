
export interface QuestionFilters {
    category?: string;
    tags?: string[];
    limit?: number;
    months: string[]; // TODO: Add some months quizType
    chapters: string[];
    questionType: string[];
    questionDifficulty: string[];
    flights: string[];
}