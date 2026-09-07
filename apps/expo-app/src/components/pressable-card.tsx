import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from "@/components/ui/text"
import Icon from './icon';
import { UIQuiz } from '@/lib/content/UI-quizzies.content';

interface QuizCardProps {
  /**
   * The data that displays the quiz
   */
  data: UIQuiz;

  /**
   * The callback when the card is pressed
   * @param data 
   * @returns void
   */
  onPress?: (data: UIQuiz) => void;

  /**
   * Optional accessibility role and custom label
   */
  aRole?: 'button' | 'link' | 'none' | 'header' | 'search' | 'image' | 'adjustable' | 'checkbox' | 'summary';
  aLabel?: string;
}

/**
 * @param props - The component props defined by {@link QuizCardProps}.
 * @returns - A quiz card that users select
 */
export default function PressableCard({ data, onPress, aRole = 'button', aLabel }: QuizCardProps) {
  return (
    <Pressable
    
      className="w-[165px] aspect-square bg-card rounded-2xl p-5 shadow-sm border border-border items-center"
      onPress={() => onPress && onPress(data)}
      accessibilityRole={"button"}
      accessibilityLabel={aLabel ?? `Select Quiz: ${data.title}`}
    >
      {/* Icon Section */}
      <View className="items-center justify-center mt-1">
        <View className="w-14 h-14 bg-purple-100 rounded-xl items-center justify-center">
          <Icon name={data.icon} size={28} color="#7c3aed" />
        </View>
      </View>

      {/* Text Content */}
      <View className="items-center w-full px-1 mb-1">
        <Text className="font-bold text-card-foreground text-base text-center" numberOfLines={1}>
          {data.title}
        </Text>
        <Text className="text-xs text-muted-foreground mt-1 text-center" numberOfLines={2}>
          {data.shortDescription}
        </Text>
      </View>
    </Pressable>
  );
}

export { PressableCard };