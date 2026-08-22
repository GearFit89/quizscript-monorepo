import React from "react";

import { Button } from "@/components/ui/button";
import { useQuizSetup } from "@/hooks/quiz-modal.hook";
import { useRouter } from "expo-router";

/**
 * Renders a trigger button that opens the quiz settings modal dialog.
 *
 * @param props - Component props.
 * @param props.children - Optional custom trigger content. Defaults to "Open Quiz Settings".
 * @returns A button that trggers a router push
 * @example 
 * <QuizSetup > 
 *   <Button >
 *     <SetupTrigger />
 *   </Button>
 * <QuizSetup >
 
 */
export const SetupTrigger = ({ children }: { children?: React.ReactNode }) => {
  const  {id: quizId,  type: quizType} = useQuizSetup();
  const router = useRouter()

  function handlePress () {

    router.push({
      pathname: 'setup',
      params: {quizId, quizType}
    })

  }

  return (

    <Button onPress={handlePress} >

      {children}

      </Button>
  )
}