import QuizSetup, { SetupDifficultyOption, SetupModeOption } from "@/components/quiz-setup";
import { QuizMode } from "@bq/shared/types";
import { useLocalSearchParams } from "expo-router";
import DefaultQuizFilters from "../question-filters/default-quiz-filters";
import Content, { setupContent } from "@/lib/content";

type StandardQuizModes =  "normal" | 'timed'

export default function StandardSetup (){
        const { id, type } = useLocalSearchParams<{id:string, type: QuizMode}>()
        const { modes, }} = setupContent.standard


    return (
        <QuizSetup id={id} type={type} >

           <SetupModeOption 
             value="normal" 
             title={content.modes.normal.title}
             icon={Content.setup.standard.modes.normal.icon}
             description={content.modes.normal.description}

           />
           <SetupModeOption />"


           <SetupDifficultyOption value="easy" />
           <SetupDifficultyOption value="medium"/>
           <SetupDifficultyOption value="hard"/>

           <DefaultQuizFilters />
        </QuizSetup>
    )
}