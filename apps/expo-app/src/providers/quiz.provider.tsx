import { useSelector } from '@xstate/react'
import { QuizActorContext } from '@/context'
import { RootActorContext } from '@/context'

interface QuizProviderProps {
  actorId: string;
  children: React.ReactNode;
}

export function QuizProvider ({ actorId, children }: QuizProviderProps) {
  const rootActorRef = RootActorContext.useActorRef()

  const quizActorRef = useSelector(
    rootActorRef,
    (state: any) => state.children?.[actorId] ?? null
  )

  return (
    <QuizActorContext.Provider value={quizActorRef}>
      {children}
    </QuizActorContext.Provider>
  )
}
