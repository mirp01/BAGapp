import { Tabs } from 'expo-router';
import React from 'react';
import  { MainMenu } from '@/components/MainMenuC';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <MainMenu></MainMenu>
  );
}
