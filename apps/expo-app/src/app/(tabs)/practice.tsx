import React from "react";
import { View, ScrollView } from "react-native";
import { PressableCard } from "@/components/pressable-card";
import { UI_QUIZZES, UIQuiz } from "@/lib/content/UI-quizzies.content";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { QuizMode } from "@bq/shared/types";
import Content from "@/lib/content";
import { P } from "@/components/ui/p";
import { Icon as LucideIcon } from "@/components/ui/lucide-icon";
import { User, Users } from "lucide-react-native";
import { QuizSetup, SetupTrigger } from "@/components/quiz-setup";

function FlashCardButton() {
  return (
    <Button variant="default" className="w-full flex-col items-start p-6 h-auto gap-2 border-border bg-card rounded-2xl">
      <Text className="font-bold text-base text-card-foreground">{Content.practicePage.flashCardButton.title}</Text>
      <Text variant={"p"} className="text-sm text-muted-foreground">{Content.practicePage.flashCardButton.description} </Text>
    </Button>
  );
} 

function ContentButton (){
  return (
    <Button className="w-full flex-col items-start p-6 h-auto gap-2 border-border bg-card rounded-2xl">
      <Text className="font-bold text-base text-card-foreground">{Content.practicePage.contentButton.title} </Text>
      <Text variant={'p'} className="text-sm text-muted-foreground">{Content.practicePage.contentButton.description} </Text>
    </Button>
  )
}

function QuizGrid() {
  const [mode, setMode] = React.useState<QuizMode>("SOLO");

  const activeQuizzes: UIQuiz[] = mode === "SOLO" ? UI_QUIZZES.SOLO : UI_QUIZZES.VS;

  return (
    <View className="flex-1 gap-3 mt-2">




     
      {/* Tab Switcher */}
      <View className="flex-row gap-2 mb-4">
        <Button
          variant={mode === "SOLO" ? "default" : "outline"}
          onPress={() => setMode("SOLO")}
          className="h-9 py-1.5 px-3 flex-row items-center gap-2 border-0 bg-card"
        >
          <LucideIcon as={User} size={16} className="text-card-foreground" />
          <Text className="text-sm text-card-foreground">Solo</Text>
        </Button>

        <Button
          variant={mode === "VS" ? "default" : "outline"}
          onPress={() => setMode("VS")}
          className="h-9 py-1.5 px-3 flex-row items-center gap-2 border-0 bg-card"
        >
          <LucideIcon as={Users} size={16} className="text-card-foreground" />
          <Text className="text-sm text-card-foreground">VS</Text>
        </Button>
      </View>

      {/* Quiz List as 2-column grid */}
      
}

export default function PracticePage() {
  return (
    <View className="flex-1 p-4 gap-y-4">

      <ContentButton />
      <FlashCardButton />

      <QuizGrid />
    </View>
  );
}