import { StylesState, type QuizSetupState } from "./hooks";
import { createContext } from "react";

export const QuizSetupContext = createContext<QuizSetupState<any> | null>(null);

export const StyleContext = createContext<StylesState | null>(null)