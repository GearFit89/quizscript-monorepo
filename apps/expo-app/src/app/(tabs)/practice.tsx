import React from "react";
import { View, ScrollView } from "react-native";
import { QuizCard } from "@/components/quiz-card";
import { UI_QUIZZES, UIQuiz } from "@/lib/content/UI-quizzies.content";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { QuizMode } from "@bq/shared/types";
import Content from "@/lib/content";
import { P } from "@/components/ui/p";

function FlashCardButton() {
  return (
    <Button variant="default" >
      <Text>{Content.practicePage.flashCardButton.title}</Text>
      <P>{Content.practicePage.flashCardButton.description} </P>
    </Button>
  );
} 

function ContentButton (){
  return (
    <Button >
      <Text>{Content.practicePage.contentButton.title} </Text>
      <Text>{Content.practicePage.contentButton.title} </Text>
    </Button>
  )
}

function QuizGrid() {
  const [mode, setMode] = React.useState<QuizMode>("SOLO");

  const activeQuizzes: UIQuiz[] = mode === "SOLO" ? UI_QUIZZES.SOLO : UI_QUIZZES.VS;

  return (
    <View className="flex-1">




      <FlashCardButton />
      {/* Tab Switcher */}
      <View className="flex-row gap-2 mb-4">
        <Button
          variant={mode === "SOLO" ? "default" : "outline"}
          onPress={() => setMode("SOLO")}
          className="flex-1"
        >
          <Text>Solo</Text>
        </Button>

        <Button
          variant={mode === "VS" ? "default" : "outline"}
          onPress={() => setMode("VS")}
          className="flex-1"
        >
          <Text>VS</Text>
        </Button>
      </View>

      {/* Quiz List */}
      <ScrollView className="w-full" contentContainerClassName="gap-3">
        {activeQuizzes.map((quiz) => (
          <QuizCard 
            key={quiz.id} 
            data={quiz} 
            onPress={() => {}} 
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default function PracticePage() {
  return (
    <View className="flex-1 p-4">

      <ContentButton />
      <FlashCardButton />

      <QuizGrid />
    </View>
  );
}