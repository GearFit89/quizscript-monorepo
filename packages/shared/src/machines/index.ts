import { setup, createMachine, StateMachine, AnyStateMachine } from "xstate";
import { soloQuizMachine } from "./quizzes/offline/solo-quiz.machine";

export const rootMachine = setup({
  types: {
    context: {} as {  },
    events: {} as
      | { type: "LOGIN" }
      | { type: "SIGN_UP" }
      | { type: "SELECT_QUIZ" }
      | { type: "SELECT_QUIZZING" }
      | { type: "SELECT_GUEST_MODE" }
      | { type: "CONNECTION_REGAINED" }
      | { type: "SEND_FRIEND_REQUEST" }
      | { type: "ON_CONNECTION_FAILED" },
  },
  actors: {
    checkCookies: createMachine({
      /* ... */
    }),
    Online: createMachine({
      /* ... */
    }),
    Freatures: createMachine({
      /* ... */
    }),
    Quizzing: createMachine({
      /* ... */
    }),
    OfflineQuiz: createMachine({
      /* ... */
    }),
    signUpUser: createMachine({
      /* ... */
    }),
    loginUser: createMachine({
      /* ... */
    }),
    waiting: createMachine({
      /* ... */
    }),
    quizzing: createMachine({
      /* ... */
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QCcD2qAuA6AxgCzBwGsBLAOygEEBXDPAYglTLC3IDdUjX9CiBhdKTiUcGVMgDaABgC6iUAAdUsEhhLMFIAB6IArACYANCACeiAIx7rWAMwBOACwHbFt1YDsexwF8fJtExcAmJyKloGMGQ0ZCxFABsAQwwAMwkAW2C+QS4SETEJGXkkEGVVdU0S3QRbAA5bLD1XAwA2aVqWptbvE3MEC1qDRsdpUekDe2t7C0dbPwD0bBxmFjFIeiiYuKTUjKxmePJWACNE4ig0ajIIIq0ytQ0yLWqLdvssTpaDbscWkekLL1LNZHI02rV7B4oYNnPMQIElitCBh1gB5AByAH1+Bj0QBRfgAFQAkhjMQAxSjEgAyeIAIrcSvcKk8qpY3h89F8fn9RoCzJZHBCsB57KMua02rZHHo4QjcEi1hAsGd1OwwPQAMp42lEzEARQAqsSAFom4nogDijKUKgelVA1Ta0iwIy+jnsTjFAw8QP6ejFdicLmkelqMIscsWCrIqxRytVJHVWrx6LpFIASsTU+mM3ijXjNYSbaU7SznohbAZalhum0DHoPBC2vY-TNJlhIV5bB5bHoBrUPFGgstY8jIFgAI7UEgAL1nYUYzFYHC4rAORynM9nJeZjwrCBaVawEOkbSFUN+-bb3iGEOcDZ7Ysmkf88OjV0SETAZHUOGS6yasSlpYoaAAKu5lvubIIAYIxYGMAKStCZ56H6wadlyLQvgGXL2LUw7YJ+36-iQ-7xvQ1KopaFqQeU0GOogcEuohFjIU2qF+vUQwTHyLQQp6UL2IRWDEXQP5-gByokBA8QatquqEpilqGoWSkALKonSeJ0farKMbB8GsextScQKCAeNIDQyi0LQeBYllwReImoCkKSHCw9A4ui+JEqSWJ5paVL4gych3FBDo6JYxjmWxLluR5rCJsmCkEkpRqmrp5YwTMooIVYbQtBYfZNj0sUgq6+F1B04wGB4Xzxe5m7TnOC4UEuLBsGQnDcFgEBoIo+wJZusCoPEqBbnOWUMVF-SOHlAJcmexWNrUZV9FYZ6dlV9QOK4thWSJqhQGQYSGooHUrt1a5YMdZDnaI4hSGFTIRfps2dBYnZni482hvNYboVCwyjCV2EWE4r4LEEd1nRdmwSNsyRpMgmR3Q9BTPcUtr0ZF1QeDFfSetZXKWd2DkBiJ41QFAYTEmQl1dT1rDU+Qj2FC9ON6QeXxtjKHgIeCtQytWDaDFTqA03TDMI7ECTI3srNkOzWPhbj71OoTlhsS6vGhq8XLhuGIlQNQcAYOpqAQPJOppQaxomtNeOIEVDSWa4biOBYXxuK25n2V93h8tI9nVVWIktfOi5MJ1q69ab5tDU1nWjeNk07pzpbqzzxUilZ7hez7EN+rZoLSP8oZ6OXva9n4b5kFbcBaAiavczBAC0tgtH67deI0iHjJMAYzCJvChBQNB0K32UGc4N56I0Dj4fVbG-JCLSj4q8bTzN1QNgLgy1GxxWtPVVltl3X3zV4IzeC+vhvvKo5xhOyVgDvzs1KGJ7VsfVZ2VKeeV8oR3wJiMeqBhN5jiVOnNqUAP4a0QKZIYAYewOHaKKUYjh54NC7KA5iECRJiQIKRcikAEEHgDH6XsoJMHii8EVKEcxH4fjIF+cSpCpJsFku-V62ccohy4t8WsYpxiXiPoOKG74giuWTrwrmM9ZonxrItVBvxTLVwvgTSqwt2jVnsl4AiLCZHDU6m-ChOUewtHylMaU-EsG+nKr8Tsm06geGcEeBsjVEqwLCBYgyDlv6rSsNKdxDhHDYPKgMBCR8ya9iPp7I6JATpw38bNLuNY1r2B7KefCnoZjoSaAhf4IYaoEw3sY7A1NaYUHpmk6oujayfCrH2AwxU-hthDl9aYVcDoE3yZ6E2ZtYAW0bvUxAANF5sX7B0GuIdHF9HdphWy4JbzhIjtuOB4yEDC2seXfiHQHCYMMCXPubFbBVnwh6eya064+CAA */
  context: {
    req: null,
    user: null,
    connectionAttempts: 0,
  },
  id: "root",
  initial: "checkingAuth",
  states: {
    checkingAuth: {
      invoke: {
        id: "checkCookiesActor",
        input: {},
        onDone: {
          target: "connected",
        },
        onError: {
          target: "unauthenticated",
        },
        src: "checkCookies",
      },
    },
    connected: {
      initial: "active",
      on: {
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
      states: {
        active: {
          on: {
            SELECT_QUIZZING: {
              target: "quizzing",
            },
            SEND_FRIEND_REQUEST: {
              target: "active",
            },
          },
          invoke: {
            id: "freatures.online",
            input: {},
            src: "Freatures",
          },
        },
        quizzing: {
          invoke: {
            id: "online.quiz",
            input: {},
            onDone: {
              target: "active",
            },
            src: "Quizzing",
          },
        },
      },
    },
    unauthenticated: {
      initial: "idle",
      on: {
        SIGN_UP: {
          target: "signingUp",
        },
        LOGIN: {
          target: "loggingIn",
        },
      },
      states: {
        idle: {
          on: {
            SELECT_GUEST_MODE: {
              target: "#root.guestMode",
            },
          },
        },
      },
    },
    offline: {
      initial: "active",
      on: {
        CONNECTION_REGAINED: {
          target: "checkingAuth",
        },
      },
      invoke: {
        id: "freatures.offline",
        input: {},
        src: "Freatures",
      },
      states: {
        active: {
          on: {
            SELECT_QUIZ: {
              target: "quizzing",
            },
          },
        },
        quizzing: {
          invoke: {
            id: "drop.offline.solo.quiz",
            input: {},
            onDone: {
              target: "active",
            },
            src: "OfflineQuiz",
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
          target: "connected",
        },
        onError: {
          target: "unauthenticated",
        },
        src: "loginUser",
      },
    },
    guestMode: {
      on: {
        SELECT_QUIZ: {
          target: "quizzing",
        },
      },
    },
    // multiplayerQuizzing: {
    //   initial: "lobby",
    //   states: {
    //     lobby: {
    //       invoke: {
    //         id: "lobbyWaitActor",
    //         input: {},
    //         onDone: {
    //           target: "quizzing",
    //         },
    //         src: "waiting",
    //       },
    //     },
    //     quizzing: {
    //       invoke: {
    //         id: "quizActor",
    //         input: {},
    //         src: "quizzing",
    //       },
    //     },
    //   },
    // },
    
    quizzing: {
      invoke: {
        id: "guest.offline.solo.quiz",
        input: {},
        onDone: {
          target: "guestMode",
        },
        src: "OfflineQuiz",
      },
    },
  },
});



const machines: Record<string, AnyStateMachine> = {
  root: rootMachine,
  soloOfflineQuiz: soloQuizMachine
}


export default machines;