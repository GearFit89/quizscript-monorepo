import { QuizSetupContext, QuizSetupStateArgs, useQuizSetup, useQuizSetupState } from "@/hooks/quiz-setup.hook";
import React, { createContext, useContext, useId, useRef, useState } from 'react';
import { QuizMode } from '@bq/shared/types';
import { useActor , useActorRef} from "@xstate/react"
import { DifficultyLevel } from '@bq/shared/types';

import { useSetupContent } from "@/hooks/content.hook";

interface QuizSetupProviderProps< Mode_T > extends QuizSetupStateArgs <Mode_T>{
    children: React.ReactNode;
    
    
     
}

export function QuizSetupProvider<Mode_T>({
    children,
    quizType,
    id, 
    quizActorRef,
    initialMode
   }: QuizSetupProviderProps<Mode_T>
){
  const quizSetupState =  useQuizSetupState({
        quizActorRef,
        quizType,
        initialMode,
        id,

    })
    

    return (
        <QuizSetupContext.Provider value={quizSetupState} >

            {children}

        </QuizSetupContext.Provider>
    )
}