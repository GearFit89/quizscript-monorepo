import  { QuizSetupProvider, SetupDifficultyOption, SetupModeOption } from "@/components/quiz-setup";
import { QuizMode } from "@bq/shared/types";
import { useLocalSearchParams } from "expo-router";
import DefaultQuizFilters from "../question-filters/default-quiz-filters";
import { useSetupContent } from "@/hooks/content.hook";
import { useActorRef } from "@xstate/react";



export default function StandardSetup (){

    const actorRef = useActorRef()
    const { id, type } = useLocalSearchParams<{id:string, type: QuizMode}>()
    const { standard: content } = useSetupContent()
    
    return (
        <QuizSetupProvider 
            id={id} 
            quizType={type}
            initialMode={"normal"}
            quizActorRef={actorRef}


         >

           <SetupModeOption 
             value="normal" 
             {...content.modes.normal}

           />
           <SetupModeOption
            value="timed" 
            {...content.modes.timed}

            />


           <SetupDifficultyOption value="easy" />
           <SetupDifficultyOption value="medium"/>
           <SetupDifficultyOption value="hard"/>

           <DefaultQuizFilters />
        </QuizSetupProvider>
    )
}