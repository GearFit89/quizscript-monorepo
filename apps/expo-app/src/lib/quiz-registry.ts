import StandardSetup from "@/components/setups/standard";
import { QuizKey } from "@bq/shared/types";

interface QuizEntry {
    setup: React.ComponentType;
    // TODO Add Quiz Comp.
    // quiz: React.ComponentType

}


export const QUIZ_REGISTRY: Record<QuizKey, QuizEntry> = {

    "SOLO-1":
    {
        setup: StandardSetup


    }

}

