import { StylesState, type QuizSetupState } from "./hooks";
import { createContext } from "react";
import { ContentContextValue } from "./hooks";

export const QuizSetupContext = createContext<QuizSetupState<any> | null>(null);

export const StyleContext = createContext<StylesState | null>(null)

export const ContentContext = createContext<ContentContextValue | null>(null);
