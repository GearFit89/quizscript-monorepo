import { QuizScore, QuizSettings, ScoreConfig } from "@/types/quiz";
import type { QuizQuestion, Question } from "@/types";
import { createMachine, setup, assign, fromPromise } from "xstate";
import { questionMachine, QuestionMachineContext } from "../questions/normal";
import defaultScoreConfig from "@/score-config";
import { getQuizQuestions } from "@/logic";
interface QuizLoadInput {
  quizLength: number;
  questions: Question[];
}
interface QuizMachineContext {
  score: QuizScore;
  settings: QuizSettings;

  questions: QuizQuestion[];
  quizLength: number;
  currentQuestionIndex: number;
  activeUser: string;
  scoreConfig: ScoreConfig;
}
type LoadEvent = {};
const defaultUserScore = { points: 0, correct: 0, incorrect: 0, isOut: false };

export const machine = setup({
  types: {
    context: {} as QuizMachineContext,
    events: {} as
      | { filteredQuestions: Question[]; type: "LOAD" }
      | { type: "NEXT" }
      | { type: "ANSWER_CORRECT" }
      | { type: "ANSWER_INCORRECT" },
    input: {} as {
      quizLength: number;
      userId?: string;
      scoreConfig?: ScoreConfig;
    },
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
            incorrect: currentUserScore.incorrect + 1,
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
    loadingQuizActor: fromPromise(
      async ({ input }: { input: QuizLoadInput }) => {
        await getQuizQuestions(input?.questions, input?.quizLength);
      },
    ),
    questionActor: questionMachine,
  },
  guards: {
    "quiz is done": function ({ context, event }) {
      return true;
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEcCuBLAXggdgewCcBbAQwBsA6MvEidHKAYgjxzAvoDc8Brd62gDlCpMgEUMmANoAGALqJQABzyx0AF3StFIAB6IAzAE4ZFAwBYDAdgsA2K+YCsM4wBoQAT0QBGGbYoygTLejgBMzlbe3gAcAL6x7mhYuCLkFCQAxpqc7Ghwmqz0TACCggDKAOoAogBKAPoAkoIAwgDyNTVVzQAqsgpIICpqBTg6+gjm9hSOtqHm0ZEORg7m7l4Is6aO0QYGMgu+tuZGRvGJkinEaZnZuaj5WjhFjKWVtXVtHV298jpDGo8xohJlZprN5otjis1ohHCEAjsDBEQkjQt4ziAkth8FdKDd0DkODgMoQCGAsoxBFUABo-frKVQA7QDcYgsFzA5LaGeWFWUz7AyhIyOazzGRWDFYy6idJZAnsegkghkilU2lSbz0waMkZAhBGJwUewxMKOKzRULmxwwhDbRwUE4nRzOcx+aInSUXHEy-GEpUq9SUml0v46wEs4FTGYcyHLcyrHkTI7TRHWazCmRGUKe5Le65yv2k8mBtW9TWh4bh0DjA3243RU3my0Nm1iijHR18pzGNGOHPY1KUBp0MhgRgAGVaxQAIn0K0zRhGJkYKBb3XyDDtbJmXDbQgZvBQ0TJQrYG9FM6EZGb4gkQPgIHAdFK82R57qlwBaXz2ixC3y7AsDa7omMTTEEm5WPuYShKe-bSmkAh0Aw75VnoiCfmaZjmP+LiQcBBg2t4aIUJEJ4HvY4SOCC8GvrKtyocy1aGEYNrWPyQTRDhF5Xt4Vh9neL6DvR8oUHksAjEUjGLsxCALK2tj+DYuzmCElonOEtHCb6CrEkWWTSXqtjCgE4LRL40TmaE0S2Da0YOo6FpkUYswCecubaQW7D+sWhlLsZ-gWGmOEGLYjgmNErZYc4gRzJEMxHHEglesJABm9DoLAAAWkB+bJUSzA5JxWOawphQarYLO23iKWFfG7MEfhabiFDDugo55ehSartZLnLJu3hGOme5GIex6nuel7XhKt5AA */
  context: ({ input }) => ({
    score: {},
    questions: [],
    currentQuestionIndex: 0,
    settings: {
      timerLength: 60,
    },
    quizLength: input.quizLength,
    scoreConfig: input.scoreConfig ?? defaultScoreConfig,
    activeUser: "",
  }),
  id: "quiz:normal",
  initial: "Idile",
  states: {
    Idile: {
      on: {
        LOAD: "loading",
      },
    },
    loading: {
      invoke: {
        id: "loadNormalQuiz",

        input: ({ context, event }) => {
          const questions =
            "filteredQuestions" in event ? event.filteredQuestions : [];
          return {
            questions: questions,
            quizLength: context.quizLength,
          };
        },

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
              const currentQuestion = ctx.questions[
                ctx.currentQuestionIndex
              ] as QuizQuestion;
              return {
                question: currentQuestion.question,
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
