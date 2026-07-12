import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function QuizGrid() {
  return (
    // Outer Container: Adds screen padding so content doesn't touch the edges
    <View className="flex-1 bg-gray-50 px-4 py-6">
      
      {/* Grid Wrapper: Controls the row wrapping and the spacing between cards */}
      <View className="flex-row flex-wrap justify-between gap-y-4">
        
        {/* Card 1 */}
        <TouchableOpacity 
          className="w-[47%] aspect-square bg-white rounded-2xl p-4 shadow-sm border border-gray-100 justify-between"
          activeOpacity={0.7}
        >
          <View className="w-10 h-10 bg-purple-100 rounded-xl items-center justify-center">
            <Text className="text-purple-600 text-lg">⚛️</Text>
          </View>
          <View>
            <Text className="font-bold text-gray-800 text-base"></Text>
            <Text className="text-xs text-gray-500 mt-1"></Text>
          </View>
        </TouchableOpacity>

        {/* Card 2 */}
        <TouchableOpacity 
          className="w-[47%] aspect-square bg-white rounded-2xl p-4 shadow-sm border border-gray-100 justify-between"
          activeOpacity={0.7}
        >
          <View className="w-10 h-10 bg-blue-100 rounded-xl items-center justify-center">
            <Text className="text-blue-600 text-lg">📱</Text>
          </View>
          <View>
            <Text className="font-bold text-gray-800 text-base"></Text>
            <Text className="text-xs text-gray-500 mt-1"></Text>
          </View>
        </TouchableOpacity>

        {/* Card 3 */}
        <TouchableOpacity 
          className="w-[47%] aspect-square bg-white rounded-2xl p-4 shadow-sm border border-gray-100 justify-between"
          activeOpacity={0.7}
        >
          <View className="w-10 h-10 bg-amber-100 rounded-xl items-center justify-center">
            <Text className="text-amber-600 text-lg">⚡</Text>
          </View>
          <View>
            <Text className="font-bold text-gray-800 text-base"></Text>
            <Text className="text-xs text-gray-500 mt-1"></Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
}