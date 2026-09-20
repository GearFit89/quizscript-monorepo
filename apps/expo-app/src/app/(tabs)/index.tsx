import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { QUIZ_REGISTRY } from "@/lib/quiz-registry";
import { Pressable, ScrollView, View } from "react-native";

import { useEffect } from "react";
import { ElementInspector } from "react-native-element-inspector";
import { FloatingStyleEditorButton } from "@/components/styles/floating-button";
import { useStyles, useStyleTarget } from "@/hooks";




export default function HomePage() {
    const { styles } = useStyleTarget("home")

    return (
        
            <View>
            <Text>
                This is an app! 
                {"\nWelcome to the home screen!!\n"}
               

            </Text>
            <Pressable style= { ({pressed})=>({
                ...styles.title,
               
                backgroundColor: pressed ? "red" : "blue",
                   


            }) }>
                <Text>Hi</Text>
            </Pressable>
         
           
            </View>
            
        
    )

    
}