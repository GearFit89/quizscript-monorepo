import { useQuizSetup } from "@/hooks";
import { useFilteredQuestions, useQuestions } from "@/hooks/use-questions";
import { useMemo } from "react";
import { Modal, View } from "react-native"
import { Text } from "@/components/ui/text"


export function FilteredQuestions () {
    const { data } = useQuizSetup()
   
    if(!data.questionFilters) return null;

    const {questions, isLoading, isLoadingError, error} = useFilteredQuestions({ filterCriteria: data.questionFilters});
const { data: Questions } = useQuestions()

    return (
        <View><Text>{questions.length ?? "No Questions"}</Text>
        
        <Text>{JSON.stringify(questions)}</Text>
        <Text>Loading: {isLoading}</Text>
         <Text>Error: {error?.message}</Text>
           <Text>{JSON.stringify(Questions)}</Text>

        </View>
    )
}