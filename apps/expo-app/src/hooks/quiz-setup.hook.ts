import { useCallback, useContext, useMemo, useState } from "react";
import type { QuizMode } from "@bq/shared/types";
import type {
  DifficultyLevel,
  QuestionFilters,
  BibleKey,
} from "@bq/shared/types";
import { QuizSetupContext } from "@/context";

const defualtQuizFilters: QuestionFilters = {
  months: [],
  chapters: {},
  questionType: [],
  questionDifficulty: [],
  flights: [],
};

export interface QuizSetupData<Mode_T> {
  id: string;
  quizType: QuizMode; // Named QuizType due to conflicts with quizType in xstate
  mode?: QuizMode | Mode_T;
  difficultyLevel?: DifficultyLevel;
  questionFilters?: QuestionFilters;
}

export interface QuizSetupState<Mode_T> {
  data: QuizSetupData<Mode_T>;
  setMode: (mode: Mode_T) => void;
  setDifficulty: (difficulty: DifficultyLevel) => void;
  updateData: (newData: Partial<QuizSetupData<Mode_T>>) => void;
  updateBibleRef: (
    bibleKey: BibleKey,
    value: QuestionFilters["chapters"][BibleKey],
  ) => void;
  // setQuestionFilters: React.Dispatch<React.SetStateAction<QuestionFilters>>;
  updateQuestionFilters: <K extends keyof QuestionFilters>(
    key: K,
    value: QuestionFilters[K],
  ) => void;
}
export interface QuizSetupStateArgs<Mode_T> {
  initialMode: Mode_T;
  quizType: QuizMode;
  id: string;
}

export function useQuizSetupState<Mode_T>({
  quizType,
  initialMode,
  id,
}: QuizSetupStateArgs<Mode_T>): QuizSetupState<Mode_T> {
  const [data, setData] = useState<QuizSetupData<Mode_T>>({
    id,
    quizType,
    mode: initialMode,
    difficultyLevel: "easy",
    questionFilters: defualtQuizFilters,
  });

  const setMode = useCallback((mode: Mode_T) => {
    setData((prev) => ({ ...prev, mode }));
  }, []);

  const setDifficulty = useCallback((difficultyLevel: DifficultyLevel) => {
    setData((prev) => ({ ...prev, difficultyLevel }));
  }, []);

  const updateQuestionFilters = useCallback(
    <K extends keyof QuestionFilters>(key: K, value: QuestionFilters[K]) => {
      setData((prev) => ({
        ...prev,
        questionFilters: {
          ...(prev.questionFilters ?? defualtQuizFilters),
          [key]: value,
        },
      }));
    },
    [],
  );

  const updateBibleRef = useCallback(
    <K extends BibleKey>(
      bibleKey: BibleKey,
      value: QuestionFilters["chapters"][K],
    ) => {
      setData((prev) => ({
        ...prev,
        questionFilters: {
          ...(prev.questionFilters ?? defualtQuizFilters),
          chapters: {
            ...prev.questionFilters?.chapters,
            [bibleKey]: value,
          },
        },
      }));
    },
    [],
  );

  const updateData = useCallback((newData: Partial<QuizSetupData<Mode_T>>) => {
    setData((prev) => ({ ...prev, ...newData }));
  }, []);

  return useMemo(
    () => ({
      data,
      setMode,
      setDifficulty,
      updateData,
      updateBibleRef,
      updateQuestionFilters,
    }),
    [data, setDifficulty, setMode, updateBibleRef, updateData, updateQuestionFilters],
  );
}

export function useQuizSetup<Mode_T>(): QuizSetupState<Mode_T> {
  const context = useContext(QuizSetupContext);
  if (!context) {
    throw new Error("useQuizSetup must be used within a <QuizSetup>");
  }
  return context as QuizSetupState<Mode_T>;
}
