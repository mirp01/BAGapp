import { Tabs } from 'expo-router';
import React, {  useRef, useState } from 'react';
import { MainMenu } from '@/components/MainMenuC';
import { UnityGame, UnityGameRef } from '@/components/UnityGame';
import { View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [showMainMenu, setShowMainMenu] = useState<boolean>(false); // Start with menu hidden
  const unityGameRef = useRef<UnityGameRef>(null);

  const handleUnityMessage = (message: string) => {
    if(message === 'Start'){
      setShowMainMenu(true);
    }else if(message === 'Game loaded'){
      setShowMainMenu(false);
    }
  };

  const handleModalClose = () => {
    if (unityGameRef.current) {
      unityGameRef.current.resumeUnity();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {showMainMenu && <MainMenu onCloseModal={handleModalClose} />}
      <UnityGame ref={unityGameRef} onUnityMessage={handleUnityMessage} />
    </View>
  );
}