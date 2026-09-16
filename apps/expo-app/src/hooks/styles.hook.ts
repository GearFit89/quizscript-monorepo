
import type { StyleClass, StyleContent } from "@/lib/styles"
import { styleContent } from "@/lib/styles"
import { useState } from "react"




export function useStyles(name: keyof StyleContent){
    const [styles, setStyles] = useState<StyleClass>(styleContent[name])

    function updateStyles (updater: (preStyles: StyleClass)=> StyleClass) {
        setStyles(prev=>({
            ...prev,
            ...updater(prev)
        }))
        
    }
   

    return {
        styles,
        setStyles,
        updateStyles
    }

}
