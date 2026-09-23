import { QUIZ_REGISTRY } from "@/lib/quiz-registry";
import { useLocalSearchParams } from "expo-router";
import { Text } from "@/components/ui/text"
import { View } from "react-native";




export default function QuizPage (){

      const { id } = useLocalSearchParams<{ id: string }>();
      const quiz = QUIZ_REGISTRY[id];

      if(!quiz){
          return <Text>404, no quiz here</Text>
      }

      return (
      <View>
        <Text>
            {JSON.stringify(quiz)}
        </Text>
      </View>
      )
}