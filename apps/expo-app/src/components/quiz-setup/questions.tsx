import { useQuizSetup } from "@/hooks";
import { useFilteredQuestions, useQuestions } from "@/hooks/use-questions";
import { useEffect, useMemo } from "react";
import { Modal, View } from "react-native";
import { Text } from "@/components/ui/text";

export function FilteredQuestions() {
  const { data, isQuizValid, setIsQuizVaild, minQuizQuestionLength } =
    useQuizSetup();

  if (!data.questionFilters) return null;

  const { questions, isLoading, isLoadingError, error } = useFilteredQuestions({
    filterCriteria: data.questionFilters,
  });
  useEffect(() => {
    setIsQuizVaild(questions.length >= minQuizQuestionLength);
  }, [questions]);

  return (
    <View>
      <Text>{questions.length ?? "No Questions"}</Text>

    
      <Text style={{color: isQuizValid ? "black" : "red"}}>{isQuizValid ? "Quiz is valid" : "Quiz is not vaild"}</Text>
    </View>
  );
}