import StandardSetup from "@/components/setups/standard";
import { QuizKey } from "@bq/shared/types";

interface QuizEntry {
    Setup: React.ComponentType;
    // TODO Add Quiz Comp.
    // Quiz: React.ComponentType

}


export const QUIZ_REGISTRY: Record<QuizKey, QuizEntry> = {

    "SOLO-1":
    {
        Setup: StandardSetup


    }

}

