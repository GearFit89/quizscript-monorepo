import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function SetupScreen() {
  
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Setup ID: {id}</Text>
    </View>
  );
}