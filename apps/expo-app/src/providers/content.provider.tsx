
import { useMemo } from "react";
import { useLanguage } from "@/hooks";
import { ContentContext } from "@/context";


export function ContentProvider({ children }: { children: React.ReactNode }) {
  // Pull language-specific content from the hook
  const { content } = useLanguage({});

  const value = useMemo(() => ({ content }), [content]);

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}