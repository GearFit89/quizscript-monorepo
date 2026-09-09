import { QuizKey } from "@bq/shared/types";

interface QuizEntry {
     setup: React.ReactNode;
    quiz: React.ReactNode;

}


export const QUIZ_REGISTRY: Record<QuizKey, QuizEntry> = {

    "SOLO-1":{
        

    }

}

