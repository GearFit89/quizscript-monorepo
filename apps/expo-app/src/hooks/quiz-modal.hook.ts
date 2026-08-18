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

export interface QuizSetupData <Mode_T>  {
  mode?: QuizMode | Mode_T;
  difficultyLevel?: DifficultyLevel;
  questionFilter?: QuestionFilters;
}

export interface QuizSetupState <Mode_T>  {
  type: QuizMode
  id: string;
  mode: Mode_T
  setMode: (mode: Mode_T) => void;
  difficulty: DifficultyLevel;
  setDifficulty: (difficulty: DifficultyLevel) => void;
  data: QuizSetupData<Mode_T>;
  updateData: (newData: Partial<QuizSetupData<Mode_T>>) => void;
  startQuiz: () => void;
  questionFilters: QuestionFilters;
  
  setQuestionFilters: React.Dispatch<React.SetStateAction<QuestionFilters>>;
}


const QuizSetupContext = createContext<QuizSetupState<any> | null>(null);


export function useQuizSetupState<Mode_T>(
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

export function useQuizSetup< Mode_T >(): QuizSetupState<Mode_T> {
  const context = useContext(QuizSetupContext);
  if (!context) {
    throw new Error('useQuizSetup must be used within a <QuizSetup>');
  }
  return context as QuizSetupState<Mode_T>;
}