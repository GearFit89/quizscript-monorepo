import { useStylesState } from "@/hooks"
import type { StyleContent } from "@/lib/styles";
import stylesContent from "@/lib/styles/styles.json"
import { StyleContext } from "@/context";
interface StylesProviderProps {
    children: React.ReactNode;
    
    
     
}

export function StylesProvider({
    children
}: StylesProviderProps){
    
  const styleState = useStylesState(stylesContent as StyleContent)

    return (
        <StyleContext.Provider value={styleState} >

            {children}

        </StyleContext.Provider>
    )
}