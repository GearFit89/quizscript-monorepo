import React, { createContext, useContext, useMemo } from "react";
import type { Content } from "@/lib/content/types";
import { useLanguage } from "./language.hook";
import { ContentContext } from "@/context";
// 1. Define the Context shape
export interface ContentContextValue {
  content: Content;
}



export function useContent<T = Content>(
  selector?: (data: Content) => T
): T {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error("useContent must be used within a <ContentProvider>");
  }

  return selector ? selector(context.content) : (context.content as T);
}

// 4. Convenience Hooks
export function useSetupContent() {
  return useContent((c) => c.setup);
}

export function usePracticeContent() {
  return useContent((c) => c.practicePage);
}