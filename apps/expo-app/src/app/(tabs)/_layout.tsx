import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        // Uses your lightish blue (--color-nav-active) for active tab icons/text
        tabBarActiveTintColor: 'var(--color-nav-active)',
        tabBarInactiveTintColor: '#94a3b8',
        
        // Header background color
        headerStyle: {
          backgroundColor: 'var(--color-nav-bg)',
        },
        headerTitleStyle: {
          fontWeight: '600',
        },
        
        // Bottom tab bar container styling
        tabBarStyle: {
          backgroundColor: 'var(--color-nav-bg)',
          borderTopColor: '#e2e8f0',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <SymbolView name="house.fill" tintColor={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <SymbolView name="gearshape.fill" tintColor={color} size={22} />
          ),
        }}
      />
    </Tabs>
  );
}