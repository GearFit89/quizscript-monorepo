import { Quizzes } from "../quizzes";

type QuizType = "solo" | "multiplayer";


export interface Quiz {
    id: string;
    mode : QuizType

}




export type QuizKey = keyof typeof Quizzes

export type QuizMode = "SOLO"|"VS"


export type DifficultyLevel = "easy" | "medium" | "hard" | "superHard";

 export interface QuizQuestion<A= string, Q= string> {
    id: number;
    correct?: boolean;
    ansType: A;
    questType: Q;
    quizIndex: number;
 }
