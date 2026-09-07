import { Stack } from 'expo-router';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryClient, clientPersister } from '@/lib/persist-query';
import "../global.css";





export default function RootLayout() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: clientPersister }}
     
    >

      <Stack>


      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />


        {/* <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="profile" options={{ title: 'User Profile' }} /> */}
      </Stack>
    </PersistQueryClientProvider>
  );
}