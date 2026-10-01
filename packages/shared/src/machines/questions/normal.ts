import { setup, sendParent, assign, raise, enqueueActions } from 'xstate'
import { checkAnswer } from '@/logic'
export interface QuestionMachineContext {
  answer: string;
  questionId: number | null;
  userInput: string;
  timerLength: number;
  isQuestionTimed: boolean;
  questionHeader: string;
  questionBody: string;
  type: string;

  activeUser: string | null;
}
interface UserInputEvent {
  type: 'USER_INPUT';
  userInput: string;

}
export const qeustionMachine = setup({
  types: {
    context: {} as QuestionMachineContext,
    events: {} as
      | { type: 'CORRECT' }
      | { type: 'INCORRECT' }
      | { type: 'TRY_AGAIN' }
      | UserInputEvent
      | { type: 'DISPLAY_DONE' },
  },
  actions: {
    displayQuestion: () => {
      // Add your action code here
    },
    checkInput: enqueueActions(({ enqueue, context, event }) => {
      const result = checkAnswer(context.answer, (event as UserInputEvent).userInput)

      // Enqueue the internal event back to this machine
      enqueue.raise({
        type: result.EVENT, // The all caps event CORRECT| INCORRECT| TRY AGAIN
      })
    }),
    sendIncorrectToQuiz: ({ context: ctx }) => {
      sendParent({ type: 'ANSWER_INCORRECT', userInput: ctx.userInput })
    },
    sendCorrectToQuiz: ({ context: ctx }) => {
      sendParent({ type: 'ANSWER_CORRECT', userInput: ctx.userInput })
    },
    // setActiveUser: assign(({ event }) => ({
    //     activeUser: event.userId, // send_ type: "JUMP", userId }
    //   })),
  },

  guards: {
    isQuestionTimed: function ({ context }) {
      return context.isQuestionTimed
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEcCucAuBLA9gOwTxwCcBbAQwBsA6CLWAB0vIE8s8oBFdWbfAYgAiASQDKABQAyAQQCaAfUEB5AHIBRANoAGALqJQDHLCx88+kAA9EAJgBsW6gFYALLYAcATjdb7bgMyOAIx+ADQgLIjBftQA7M4eCc6OWjHugTFuAL6ZYWiYuAREZFTUAO7kJuxQAGIkwngMqBj8FrzkGGDU5ABmHcQAFH5aw1oAlPx5vAWEJBQ05ZUctcT1jRjaekgghsam5lYIHjGB1M5uzhfWQfEpYREIgc4OcQluMX4egYE+jtbZuTxTDNivMKtglnUGk0ymCqvwAKqiNQAJXkwhU4nhABUNuYdpV8PtEI4Yh4nH5AtYMsN0o4-G47jYtG4nP4-AFAkdvo5bM5-iBJkCinMYYsapC1tQAMYACzAUoA1lVVk1+FjkQppABxaTo3FbfF7LYHRxuFnOPwxX7JYK2KmMh6m6jM9nWDx+aycrTJGL8wXTYUlBbg8UrKEYaVyxXK8P8dEAYSUyORanjON0eKMBLMxsQHlsJzOF2cV0eHlu4TzDms8S8gSCjnLpo8fsBAdmQdhELDktl8qVHBVzUTydT6c2BizRtABy5p3Ol2u5ZiDsCZuoNYSR1cHlcgVs2RyICIEDg5n9+GBc0zuwKRIQAFpbA6H9ZoluP5+vAejxfCh2aDoRhmDYDhuHyQkDSnO9cwQEtV2+WJa1sVJ9xiZlHEcVsIP-EFRRDZYhxvbN7xLBw3EbD5mU+HkC2cB1bGiWsEl+Y53jtQJsKmS9A1BMVCPDfCqmI6dLEQVwWQo91y08etbDo1deWofd5MYxiLnpVwuKFAChO7IdI37GM1hEmCZ0Qd4YicO0XC0Zc3noytHQcT84iSaw3GsZltPbPD2ClEhiHlDBTMg8yEBiFcnN+axnTZZxvhiN8fD+X82x43SAuIIKpRCqDbzCsSEBJBiqVZD1yyGLR4jNQ9MiAA */
  context: {
    answer: '',
    questionId: null,
    userInput: '',
    timerLength: 30,
    isQuestionTimed: false,
    type: 'normal',
    questionHeader: '',
    questionBody: '',
    activeUser: null, // No active user initally
  },
  id: 'question:normal',
  initial: 'displayingQuestion',
  states: {
    displayingQuestion: {
      on: {
        DISPLAY_DONE: {
          target: 'waitingForInput',
        },
      },
      entry: 'displayQuestion',
    },
    waitingForInput: {
      initial: 'waiting',
      after: {
        30000: {
          target: 'incorrect',
          guard: {
            type: 'isQuestionTimed',
          },
        },
      },
      states: {
        waiting: {
          on: {
            USER_INPUT: {
              target: 'checkingInput',
            },
          },
        },
        checkingInput: {
          on: {
            TRY_AGAIN: {
              target: 'waiting',
            },
            INCORRECT: {
              target: '#question:normal.incorrect',
            },
            CORRECT: {
              target: '#question:normal.correct',
            },
          },
          entry: {
            type: 'checkInput',
          },
        },
      },
    },
    incorrect: {
      entry: 'sendIncorrectToQuiz',
      type: 'final',
    },
    correct: {
      entry: 'sendCorrectToQuiz',
      type: 'final',
    },
  },
})
