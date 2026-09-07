import { setup, createMachine, StateMachine, AnyStateMachine } from "xstate";
import { soloQuizMachine } from "./quizzes/offline/solo-quiz.machine";



export const rootMachine = setup({
  types: {
    context: {} as { username: string },
    events: {} as
      | { type: "LOGIN" }
      | { type: "STUDY" }
      | { type: "LOGOUT" }
      | { type: "SIGN_UP" }
      | { type: "FLASHCARDS" }
      | { type: "LEAVE_GUEST" }
      | { type: "NORMAL_QUIZ" }
      | { type: "SELECT_SOLO" }
      | { type: "PRACTICE_QUIZ" }
      | { type: "NETWORK_ONLINE" }
      | { type: "NETWORK_OFFLINE" }
      | { type: "SELECT_GUEST_MODE" }
      | { type: "SELECT_MUTLIPLAYER" }
      | { type: "CONNECTION_REGAINED" }
      | { type: "ON_CONNECTION_FAILED" },
  },
  actors: {
    checkCookies: createMachine({
      /* ... */
    }),
    signUpUser: createMachine({
      /* ... */
    }),
    loginUser: createMachine({
      /* ... */
    }),
    Online: createMachine({
      /* ... */
    }),
    OfflineQuiz: createMachine({
      /* ... */
    }),
  },
}).createMachine({
  context: {
    username:""
  },
  id: "root:idea2",
  type: "parallel",
  states: {
    auth: {
      initial: "checking",
      states: {
        checking: {
          invoke: {
            id: "checkCookiesActor",
            input: {},
            onDone: {
              target: "authenticated",
            },
            onError: {
              target: "unauthenticated",
            },
            src: "checkCookies",
          },
        },
        authenticated: {
          on: {
            LOGOUT: {
              target: "unauthenticated",
            },
          },
        },
        unauthenticated: {
          initial: "idle",
          states: {
            idle: {
              on: {
                LOGIN: {
                  target: "#root:idea2.auth.loggingIn",
                },
                SIGN_UP: {
                  target: "#root:idea2.auth.signingUp",
                },
                SELECT_GUEST_MODE: {
                  target: "#root:idea2.auth.guest",
                },
              },
            },
          },
        },
        signingUp: {
          invoke: {
            id: "signUpActor",
            input: {},
            onDone: {
              target: "loggingIn",
            },
            onError: {
              target: "unauthenticated",
            },
            src: "signUpUser",
          },
        },
        loggingIn: {
          invoke: {
            id: "loginActor",
            input: {},
            onDone: {
              target: "authenticated",
            },
            onError: {
              target: "unauthenticated",
            },
            src: "loginUser",
          },
        },
        guest: {
          on: {
            LEAVE_GUEST: {
              target: "unauthenticated",
            },
          },
        },
      },
    },
    connection: {
      initial: "online",
      states: {
        online: {
          on: {
            NETWORK_OFFLINE: {
              target: "offline",
            },
            ON_CONNECTION_FAILED: {
              target: "offline",
            },
          },
          invoke: {
            id: "online.background",
            input: {},
            onError: {
              target: "offline",
            },
            src: "Online",
          },
        },
        offline: {
          on: {
            NETWORK_ONLINE: {
              target: "online",
            },
            CONNECTION_REGAINED: {
              target: "online",
            },
          },
        },
      },
    },
    activity: {
      initial: "idle",
      states: {
        idle: {
          on: {
            SELECT_SOLO: {
              target: "#root:idea2.activity.quizzing.solo",
            },
            SELECT_MUTLIPLAYER: {
              target: "#root:idea2.activity.quizzing.multiplayer",
            },
          },
        },
        quizzing: {
          initial: "solo",
          states: {
            solo: {
              initial: "active",
              states: {
                active: {
                  on: {
                    NORMAL_QUIZ: {
                      target: "normalQuiz",
                    },
                    PRACTICE_QUIZ: {
                      target: "practice",
                    },
                    STUDY: {
                      target: "study",
                    },
                    FLASHCARDS: {
                      target: "flashcards",
                    },
                  },
                },
                normalQuiz: {
                  invoke: {
                    id: "solo.normalQuiz",
                    input: {},
                    onDone: {
                      target: "#root:idea2.activity.idle",
                    },
                    src: "OfflineQuiz",
                  },
                },
                practice: {
                  invoke: {
                    id: "solo.practice",
                    input: {},
                    onDone: {
                      target: "#root:idea2.activity.idle",
                    },
                    src: "OfflineQuiz",
                  },
                },
                study: {
                  invoke: {
                    id: "solo.study",
                    input: {},
                    onDone: {
                      target: "#root:idea2.activity.idle",
                    },
                    src: "OfflineQuiz",
                  },
                },
                flashcards: {
                  invoke: {
                    id: "solo.flashcards",
                    input: {},
                    onDone: {
                      target: "#root:idea2.activity.idle",
                    },
                    src: "OfflineQuiz",
                  },
                },
              },
            },
            multiplayer: {
              initial: "connecting",
              states: {
                connecting: {},
                lobby: {},
                waiting: {},
                playing: {},
                reconnecting: {},
                results: {},
              },
            },
          },
        },
      },
    },
  },
});



const machines: Record<string, AnyStateMachine> = {
  root: rootMachine,
  soloOfflineQuiz: soloQuizMachine
}


export default machines;