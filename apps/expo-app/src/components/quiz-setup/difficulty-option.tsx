import React from "react";
import { Pressable, View, StyleProp, ViewStyle } from "react-native";
import { Text } from "@/components/ui/text";
import { DifficultyLevel } from "@bq/shared/types";
import { DialogTrigger } from "@/components/ui/dialog";
import { QuizSetup } from ".";
import { Button } from "@/components/ui/button";
import { IconKey } from "@/lib/content/icons.content";
import { useQuizSetup } from "@/hooks/quiz-modal.hook";

export interface DifficultyOptionProps {
  value: DifficultyLevel;
  description?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const DIFFICULTY_CONFIG: Record<
  DifficultyLevel,
  { label: string; containerClass: string; titleClass: string; descClass: string }
> = {
  easy: {
    label: "Easy",
    containerClass: "bg-yellow-200 border-yellow-700",
    titleClass: "text-yellow-900",
    descClass: "text-yellow-800",
  },
  medium: {
    label: "Medium",
    containerClass: "bg-orange-200 border-orange-700",
    titleClass: "text-orange-900",
    descClass: "text-orange-800",
  },
  hard: {
    label: "Hard",
    containerClass: "bg-red-200 border-red-700",
    titleClass: "text-red-900",
    descClass: "text-red-800",
  },
  super_hard: {
    label: "Super Hard",
    containerClass: "bg-purple-200 border-purple-700",
    titleClass: "text-purple-900",
    descClass: "text-purple-800",
  },
};

export const DifficultyOption: React.FC<DifficultyOptionProps> = ({
  value,
  description,
  onPress,
  style,
}) => {
  const config = DIFFICULTY_CONFIG[value];
  const {  setDifficulty } = useQuizSetup() // FIXME : fix this to udagpte state
  return (
    <Pressable 
    onPress={()=>{
      setDifficulty(value)
      onPress;  }
    } 
      disabled={!onPress}>
      <View
        style={style}
        className={`p-4 my-2 rounded-xl border ${config.containerClass}`}
      >
        <Text variant="p" className={`font-bold ${config.titleClass}`}>
          {config.label}
        </Text>
        <Text variant="p" className={`mt-1 text-sm ${config.descClass}`}>
          {description}
        </Text>
      </View>
    </Pressable>
  );
};

export default DifficultyOption
