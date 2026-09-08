import content from "@/lib/content";
import { Content } from "@/lib/content/types";
import { useState } from "react";

type Language = keyof typeof LANGUAGES


// TODO add this to shared/types
const LANGUAGES = {
    en: "English",
    sp: "Spanish"
}


interface UseLanguageOptions {
    keyName?: keyof Content;

}
interface UseLanguageReturn {
    content: Content;
    setLanguage: React.Dispatch<React.SetStateAction<Language>>
    language: Language
}

export function useLanguage({ keyName }: UseLanguageOptions): UseLanguageReturn{

    const [language, setLanguage] = useState<Language>("en");

    const languageContent = keyName ? content[keyName] : content

    // TODO Add language logic

    

    return {
        content,

        setLanguage,
        language

    }

}