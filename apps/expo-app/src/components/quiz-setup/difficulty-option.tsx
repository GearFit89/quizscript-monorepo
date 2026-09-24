import React from "react";
import { Pressable, View, StyleProp, ViewStyle } from "react-native";
import { Text } from "@/components/ui/text";
import { DifficultyLevel } from "@bq/shared/types";
import { useQuizSetup } from "@/hooks/quiz-setup.hook";
import { useStyleTarget } from "@/hooks";

export interface DifficultyOptionProps {
  value: DifficultyLevel;
  description?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
  superHard: "Super Hard",
};

export const DifficultyOption: React.FC<DifficultyOptionProps> = ({
  value,
  description,
  onPress,
  style,
}) => {
  const { setDifficulty } = useQuizSetup();
  const { styles } = useStyleTarget("difficultyOption");

  // Format super_hard key to camelCase for json property matching
  const key = value === "superHard" ? "superHard" : value;

  const containerStyle = styles[key];
  const titleStyle = styles[`${key}Title` as keyof typeof styles];
  const descStyle = styles[`${key}Desc` as keyof typeof styles];

  const handlePress = () => {
    setDifficulty(value);
    onPress?.();
  };

  return (
    <Pressable onPress={handlePress} disabled={!onPress}>
      <View style={[styles.container, containerStyle, style]}>
        <Text variant="p" style={titleStyle}>
          {DIFFICULTY_LABELS[value]}
        </Text>
        {description ? (
          <Text variant="p" style={[styles.desc, descStyle]}>
            {description}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
};

export default DifficultyOption;