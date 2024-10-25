import { Tabs } from 'expo-router';
import React from 'react';
import  { MainMenu } from '@/components/MainMenuC';
import { ImageBackground, StyleSheet } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ImageBackground 
        source={require('../../assets/images/Menu.png')} 
        style={styles.backgroundImage}
    >
        <MainMenu />
    </ImageBackground>
);
}

const styles = StyleSheet.create({
  backgroundImage: {
      flex: 1, // Takes full available space
      justifyContent: 'center', // Center child components
      alignItems: 'center', // Center child components
  },
});