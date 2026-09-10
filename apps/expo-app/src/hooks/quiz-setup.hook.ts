import React, {
  createContext,
  useContext,
  useState,
} from "react";
import { QuizMode } from "@bq/shared/types";
import { useActor, useActorRef } from "@xstate/react";
import type {
  DifficultyLevel,
  QuestionFilters,
  BibleKey,
} from "@bq/shared/types";
import { BIBLE_BOOKS } from "@bq/shared/utils";

export const QuizSetupContext = createContext<QuizSetupState<any> | null>(null);

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
  // Single source for setup data
  const [data, setData] = useState<QuizSetupData<Mode_T>>({
    id,
    quizType,
    mode: initialMode,
    difficultyLevel: "easy",
    questionFilters: defualtQuizFilters,
  });

  //  Helpers to set certain fields directly
  const setMode = (mode: Mode_T) => {
    setData((prev) => ({ ...prev, mode }));
  };

  const setDifficulty = (difficultyLevel: DifficultyLevel) => {
    setData((prev) => ({ ...prev, difficultyLevel }));
  };

  // FIXME: When I can understand and needed this uncomment this
  // const setQuestionFilters: React.Dispatch<React.SetStateAction<QuestionFilters>> = (action) => {
  //   setData((prev) => {
  //     const currentFilters = prev.questionFilters ?? defualtQuizFilters;
  //     const nextFilters = typeof action === 'function' ? action(currentFilters) : action;
  //     return { ...prev, questionFilters: nextFilters };
  //   });
  // };

  const updateQuestionFilters = <K extends keyof QuestionFilters>(
    key: K,
    value: QuestionFilters[K],
  ) => {
    setData((prev) => ({
      ...prev,
      questionFilters: {
        ...(prev.questionFilters ?? defualtQuizFilters),
        [key]: value,
      },
    }));
  };
  const updateBibleRef = <K extends BibleKey>(
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
  };

  const updateData = (newData: Partial<QuizSetupData<Mode_T>>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return {
    data,
    setMode,
    setDifficulty,
    updateData,
    updateBibleRef,
    // setQuestionFilters,
    updateQuestionFilters,
  };
}
export function useQuizSetup<Mode_T>(): QuizSetupState<Mode_T> {
  const context = useContext(QuizSetupContext);
  if (!context) {
    throw new Error("useQuizSetup must be used within a <QuizSetup>");
  }
  return context as QuizSetupState<Mode_T>;
}
