import React, { createContext, useContext, useRef, useState } from 'react';
import { QuizMode } from '@bq/shared/types';
import { useActor , useActorRef} from "@xstate/react"
import { DifficultyLevel } from '@bq/shared/types';



export interface QuestionFilters {
  category?: string;
  tags?: string[];
  limit?: number;
  months: string []; // TODO: Add some months type
  chapters: string[];
  questionType: string [];
  questionDifficulty: string [];
  flights: string []

}

export interface QuizModalData <Mode_T>  {
  mode?: QuizMode | Mode_T;
  difficultyLevel?: DifficultyLevel;
  questionFilter?: QuestionFilters;
}

export interface QuizModalState <Mode_T>  {
  mode: QuizMode;
  setMode: (mode: QuizMode) => void;
  difficulty: DifficultyLevel;
  setDifficulty: (difficulty: DifficultyLevel) => void;
  data: QuizModalData<Mode_T>;
  updateData: (newData: Partial<QuizModalData<Mode_T>>) => void;
  startQuiz: () => void;
  questionFilters: QuestionFilters;
  
  setQuestionFilters: React.Dispatch<React.SetStateAction<QuestionFilters>>;
}


const QuizModalContext = createContext<QuizModalState<any> | null>(null);


export function useQuizModalState<Mode_T>(
    initialMode: Mode_T,
    quizActorRef: { send: (event: any) => void })
     {
  const [mode, setMode] = useState<Mode_T>(initialMode);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy');
  const [questionFilters, setQuestionFilters] = useState<QuestionFilters>();

  const { send } = quizActorRef;
 
  const startQuiz = () => {
    console.log('Starting quiz with:', { mode, difficulty });
    send({
      type: "START",
      mode, 
      difficulty,
      questionFilters


    })
  }
     

  return {
    mode,
    setMode,
    difficulty,
    setDifficulty,
    questionFilters,
    setQuestionFilters,
    startQuiz,
  };
}

export function useQuizModal< Mode_T >(): QuizModalState<Mode_T> {
  const context = useContext(QuizModalContext);
  if (!context) {
    throw new Error('useQuizModal must be used within a <QuizModal>');
  }
  return context as QuizModalState<Mode_T>;
}