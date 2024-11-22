import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';

import Index from './index';
import Login from './login';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Hide splash screen immediately since we're not loading fonts
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack.Navigator 
      screenOptions={{
          headerShown: false,
        }} 
      >
        <Stack.Screen name="index" component={Index} />
        <Stack.Screen name="login" component={Login} />
      </Stack.Navigator>
  );
}
