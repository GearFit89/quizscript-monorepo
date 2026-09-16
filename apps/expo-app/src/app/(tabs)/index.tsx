import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { QUIZ_REGISTRY } from "@/lib/quiz-registry";
import { ScrollView, View } from "react-native";
import { useStyles } from "@/hooks/styles.hook";
import { useEffect } from "react";
import { ElementInspector } from "react-native-element-inspector";




export default function HomePage() {

    return (
        <ElementInspector enabled={__DEV__}>
            <View>
            <Text>
                This is an app! 
                {"\nWelcome to the home screen!!\n"}
               

            </Text>
            <Button>

            </Button>
            <Button variant={"outline"}></Button>
            <View className="bg-red-500 p-4 rounded-full"/>
            </View>
            
        </ElementInspector>
    )

    
}