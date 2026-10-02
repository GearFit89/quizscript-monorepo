import type { QuizScore, QuizSettings, ScoreConfig } from "@/types/quiz";
import { QuizQuestion } from "@/types";
import { createMachine, setup, assign, fromPromise } from "xstate";
import { qeustionMachine, QuestionMachineContext } from "../questions/normal";

interface QuizMachineContext {
  score: QuizScore;
  settings: QuizSettings;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  activeUser: string;
  scoreConfig: ScoreConfig;
}
const defaultUserScore = { points: 0, correct: 0, incorrect: 0, isOut: false };

export const machine = setup({
  types: {
    context: {} as QuizMachineContext,
    events: {} as
      | { type: "NEXT" }
      | { type: "ANSWER_CORRECT" }
      | { type: "ANSWER_INCORRECT" },
  },
  actions: {
    scoreIncorrect: assign({
      score: ({ context }) => {
        const incorrectScore = context.scoreConfig.incorrect;
        const currentUserScore =
          context.score[context.activeUser] ?? defaultUserScore;
        return {
          ...context.score,
          [context.activeUser]: {
            ...currentUserScore,
            points: currentUserScore.points + incorrectScore.points,
            correct: currentUserScore.incorrect + 1,
            // TODO: add this fro quiz out logic
            //isOut: currentUserScore.correct === 5
          },
        };
      },
    }),
    scoreCorrect: assign({
      score: ({ context }) => {
        const correctScore = context.scoreConfig.correct;
        const currentUserScore =
          context.score[context.activeUser] ?? defaultUserScore;
        return {
          ...context.score,
          [context.activeUser]: {
            ...currentUserScore,
            points: currentUserScore.points + correctScore.points,
            correct: currentUserScore.correct + 1,
            // TODO: add this fro quiz out logic
            //isOut: currentUserScore.correct === 5
          },
        };
      },
     

      currentQuestionIndex: ({ context }) => context.currentQuestionIndex + 1,
    }),
  },
  actors: {
    loadingQuizActor: fromPromise(),
    questionActor: qeustionMachine,
  },
  guards: {
    "quiz is done": function ({ context, event }) {
      // Add your guard condition here
      return true;
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEcCuBLAXggdgewCcBbAQwBsA6MvEidHKAYgjxzAvoDc8Brd62gDlCpMgEUMmANoAGALqJQABzyx0AF3StFIAB6IAzAE4ZFAwBYDAdgsA2K+YCsM4wBoQAT0QBGGbYoygTLejgBMzlbe3gAcAL6x7mhYuCLkFCQAxpqc7Ghwmqz0TACCggDKAOoAogBKAPoAkoIAwgDyNTVVzQAqsgpIICpqBTg6+gjm9hSOtqHm0ZEORg7m7l4Is6aO0QYGMgu+tuZGRvGJkinEaZnZuaj5WjhFjKWVtXVtHV298jpDGo8xohJlZprN5otjis1ohHCEAjsDBEQkjQt4ziAkth8FdKDd0DkODgMoQCGAsoxBFUABo-frKVQA7QDcYgsFzA5LaGeWFWUz7AyhIyOazzGRWDFYy6idJZAnsegkghkilU2lSbz0waMkZAhBGJwUewxMKOKzRULmxwwhDbRwUE4nRzOcx+aInSUXHEy-GEpUq9SUml0v46wEs4FTGYcyHLcyrHkTI7TRHWazCmRGUKe5Le65yv2k8mBtW9TWh4bh0DjA3243RU3my0Nm1iijHR18pzGNGOeIJED4CBwHRSvNkCtM0YRhAAWiMNtnthz2NSlAEdAYk91M-MoRt0W80yCfhkjizBlsRnRA7Ha9lt23Vb0hgXies-KCMVsMz35olt5evevp3A8hRbgM-w7tWiALK2tj+DYuzmCElonOEK7SvmtxEv6xZPsyMEbMKATgoe+yHqE0S2Da0YOo6FqRJmsx9oBubAQW7B4VkBHTkRV7+BYaZ7pe577K2ZrHoEcyRDMRxxGxq64hQABm9DoLAAAWkC8XqUSzPRJxWOawo-garYLO23gIT+3hIcEfj9rEQA */
  context: {
    score: {},
    questions: [],
    currentQuestionIndex: 0,
    settings: {
      timerLength: 60,
    },
    activeUser: "",
  },
  id: "quiz:normal",
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: "loadNormalQuiz",
        input: {},
        onDone: {
          target: "active",
        },
        src: "loadingQuizActor",
      },
    },
    active: {
      initial: "questioning",
      states: {
        questioning: {
          on: {
            ANSWER_INCORRECT: {
              target: "incorrect",
            },
            ANSWER_CORRECT: {
              target: "correct",
            },
          },
          invoke: {
            id: "questionNormalQuiz",
            input: ({ context: ctx }) => {
              const currectQuestion = ctx.questions[
                ctx.currentQuestionIndex
              ] as QuizQuestion;
              return {
                question: currectQuestion.question,
                isQuestionTimed: ctx.settings.timerLength !== 0,
                timerLength: ctx.settings.timerLength,
              } as QuestionMachineContext;
            },

            src: "questionActor",
          },
        },
        incorrect: {
          on: {
            NEXT: [
              {
                target: "questioning",
                guard: {
                  type: "quiz is done",
                },
              },
              {
                target: "#quiz:normal.finished",
              },
            ],
          },
          entry: "scoreIncorrect",
        },
        correct: {
          entry: "scoreCorrect",
          on: {
            NEXT: [
              {
                target: "questioning",
                guard: {
                  type: "quiz is done",
                },
              },
              {
                target: "#quiz:normal.finished",
              },
            ],
          },
        },
      },
    },
    finished: {
      type: "final",
    },
  },
});
