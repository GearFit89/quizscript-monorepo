import React from "react";
import { Pressable, View } from "react-native";
import { IconKey } from "@/lib/content/icons.content";
import Icon from "../icon";
import { Text } from "../ui/text";
import { useQuizSetup } from "@/hooks/quiz-modal.hook";
import { QuizMode  } from "@bq/shared/types";

export interface ModeOptionProps<Mode_T> {
  value: Mode_T;
  title: string;
  icon: IconKey;
  description?: string;
  color?: string;
  name?: string; // Kept as optional if needed elsewhere
}


export default function ModeOption<Mode_T>({
  value,
  title,
  icon,
  description,
  color = "bg-primary",
}: ModeOptionProps<Mode_T>) {
  const { setMode } = useQuizSetup<Mode_T>();

  const handlePress = () => {
    setMode(value);
  };

  return (
    <Pressable
      onPress={handlePress}
      className={`p-4 my-2 rounded-xl border border-border flex-row items-center justify-between ${color}`}
    >
      <View className="flex-1 mr-3">
        <Text variant="p" className="font-bold text-lg">
          {title}
        </Text>
        <Text variant="p" className="text-sm text-muted-foreground mt-1">
          {description}
        </Text>
      </View>

      <Icon color={color} name={icon} />
    </Pressable>
  );
}