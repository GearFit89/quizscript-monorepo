import content from "@/lib/content";
import { Content } from "@/lib/content/types";
import { useLanguage } from "./language.hook";


/**

 * Custom hook to select and retrieve dynamic app content.

 *

 * @template T - The inferred return type taken from the selector function.

 * @param selector - Optional transformation function to use a certain part of the content.

 * @returns The full content object or the selected content defined by `selector`.

 */
function useContent<T = Content>(selector?: (data: Content) => T, keyName?: keyof Content): T {


    const { content: languageContent } = useLanguage({ keyName })
  // Infers the T type to the returned content
  return selector ? selector(languageContent) : (languageContent as T);
}

/**
 * Custom hook that uses the setup content, to avoid long chaining.
 * 
 * @returns The setup content from the app content.
 */
function useSetupContent() {
  return useContent((c) => c.setup);
}
function usePracticeContent (){
  return useContent((c)=> c.practicePage)
}

export { useContent, useSetupContent, usePracticeContent };