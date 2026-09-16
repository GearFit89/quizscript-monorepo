import { useCallback, useContext, useState } from "react";
import type { AnyStyle, StyleClass, StyleContent } from "../lib/styles/types";
import { StyleContext } from "@/context";
export interface StylesState {
  stylesContent: StyleContent;
  /** Replace the whole tree. */
  setStylesContent: (next: StyleContent) => void;
  /** Functional update of the whole tree. */
  updateStylesContent: (updater: (prev: StyleContent) => StyleContent) => void;
  /** Set (or overwrite) a single style property on target.element. */
  setStyleProperty: (
    target: string,
    element: string,
    styleKey: string,
    value: AnyStyle[keyof AnyStyle]
  ) => void;
  /** Remove a single style property from target.element. */
  removeStyleProperty: (target: string, element: string, styleKey: string) => void;
  /** Create a new sub-element under a target with an empty style object. */
  addElement: (target: string, element: string) => void;
  /** Create a new top-level target with an empty StyleClass. */
  addTarget: (target: string) => void;
}

export function useStylesState(initial: StyleContent): StylesState {
  const [stylesContent, setStylesContent] = useState<StyleContent>(initial);

  const updateStylesContent = useCallback(
    (updater: (prev: StyleContent) => StyleContent) => {
      setStylesContent((prev) => updater(prev));
    },
    []
  );

  const setStyleProperty = useCallback(
    (target: string, element: string, styleKey: string, value: AnyStyle[keyof AnyStyle]) => {
      setStylesContent((prev) => {
        const prevClass: StyleClass = prev[target] ?? {};
        const prevElementStyle: AnyStyle = prevClass[element] ?? {};
        return {
          ...prev,
          [target]: {
            ...prevClass,
            [element]: {
              ...prevElementStyle,
              [styleKey]: value,
            },
          },
        };
      });
    },
    []
  );

  const removeStyleProperty = useCallback(
    (target: string, element: string, styleKey: string) => {
      setStylesContent((prev) => {
        const prevClass = prev[target];
        if (!prevClass || !prevClass[element]) return prev;
        const nextElementStyle = { ...prevClass[element] } as Record<string, unknown>;
        delete nextElementStyle[styleKey];
        return {
          ...prev,
          [target]: {
            ...prevClass,
            [element]: nextElementStyle as AnyStyle,
          },
        };
      });
    },
    []
  );

  const addElement = useCallback((target: string, element: string) => {
    setStylesContent((prev) => ({
      ...prev,
      [target]: {
        ...(prev[target] ?? {}),
        [element]: prev[target]?.[element] ?? {},
      },
    }));
  }, []);

  const addTarget = useCallback((target: string) => {
    setStylesContent((prev) => ({
      ...prev,
      [target]: prev[target] ?? {},
    }));
  }, []);

  return {
    stylesContent,
    setStylesContent,
    updateStylesContent,
    setStyleProperty,
    removeStyleProperty,
    addElement,
    addTarget,
  };
}



export const useStyles = () => {

  try {
    const context = useContext(StyleContext);
    return context;
    
  } catch (error) {
    console.error("UseStyles must in a <Styles> </Styles> Provider.")
    
  }
}