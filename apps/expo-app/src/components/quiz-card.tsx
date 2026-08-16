import { UIQuiz } from '@/lib/content/UI-quizzies.content';
import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from "@/components/ui/text"
import Icon from './icon';
import { Card } from '@/components/ui/card';


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
  onPress: (data: UIQuiz) => void;
}
/**
 * 
 * @param props - The component props defined by {@link QuizCardProps}.
 * @returns - A quiz card that users eelect
 */
export function QuizCard ({ data, onPress } : QuizCardProps ){


  return (
       
        <Pressable
          className="w-[47%] aspect-square bg-white rounded-2xl p-4 shadow-sm border border-gray-100 justify-between"
        onPress={()=>onPress(data)}
        accessibilityRole='button'
        accessibilityLabel= { `Select Quiz: ${data.title}`}
        >
          <Card>
          <View className="w-10 h-10 bg-purple-100 rounded-xl items-center justify-center">
           <Icon key={data.icon} />
          </View>

          <View>
            <Text className="font-bold text-gray-800 text-base">{data.title}</Text>
            <Text className="text-xs text-gray-500 mt-1">{data.shortDescription}</Text>
          </View>
          </Card>
        </Pressable>
  )
}
