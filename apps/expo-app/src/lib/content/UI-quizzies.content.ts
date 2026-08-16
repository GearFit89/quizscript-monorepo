
import { Button } from "@/components/ui/button";
import type { IconKey } from "./icons.content";
import type { QuizKey, QuizMode } from "@bq/shared/types";

export interface UIQuiz {
    id: QuizKey;
    title: string;
    description?: string;
    icon: IconKey;
    shortDescription: string;
    modalVariant: string

}


export const UI_QUIZZES:  Record< QuizMode, UIQuiz []> = {
    SOLO: [
        {
            id: "SOLO-1",
            title: "Solo Quiz",
            description: "Test your knowledge with a solo quiz.",
            icon: "quiz",
            shortDescription: "Challenge yourself with a solo quiz.",
            modalVariant: "solo-quiz-modal"
        },
    ],
    VS: [
        {
            id: "VS-1",
            title: "VS Quiz",
            description: "Compete against a friend in a vs quiz. ",
            icon: "quiz",
            shortDescription: "Challenge a friend in a vs quiz.",
            modalVariant: "vs-quiz-modal"
        },
    ],
    
}

