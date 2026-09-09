import { Text } from "@/components/ui/text";
import { QUIZ_REGISTRY } from "@/lib/quiz-registry";
import { ScrollView, View } from "react-native";


export default function HomePage() {

    return (
        <View>
            <Text>
                This is an app! 
                {"\nWelcome to the home screen!!\n"}
                Quizzes: {'\n'}
                {Object.values(QUIZ_REGISTRY).map((q,i)=>(
                    <ScrollView key={i}>
                        <q.Setup/>
                    </ScrollView>
                ))}

            </Text>
        </View>
    )

    
}