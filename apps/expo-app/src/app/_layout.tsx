import { Stack } from 'expo-router';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryClient, clientPersister } from '@/lib/persist-query';
import "../global.css";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StylesProvider } from '@/providers';
import { ContentProvider } from '@/providers/content.provider';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: clientPersister }}
        >
          <StylesProvider>
            <ContentProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="setup" options={{ headerShown: false }} />
              </Stack>
            </ContentProvider>
          </StylesProvider>
        </PersistQueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}