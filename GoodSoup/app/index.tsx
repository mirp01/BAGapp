import React,{  useRef, useState }from 'react';
import{ MainMenu }from '@/components/MainMenuC';
import{ UnityGame, UnityGameRef }from '@/components/UnityGame';
import{ View }from 'react-native';
import{ useColorScheme }from '@/hooks/useColorScheme';
import{ Audio }from 'expo-av';

let currentSound: Audio.Sound | null = null;

const playSound = async(isPlaying: boolean) =>{
  try{
    if(isPlaying){
      if(currentSound){
        await currentSound.stopAsync();
        await currentSound.unloadAsync();
      }
      const{ sound }= await Audio.Sound.createAsync(
        require('../assets/CuteBossaNova.wav'),
       { shouldPlay: true }
      );
      await sound.playAsync();
      currentSound = sound;
    }else{
      console.log("Stopping sound");
      if(currentSound){
        await currentSound.stopAsync();
        await currentSound.unloadAsync();
        currentSound = null;
      }
    }
  }catch(error){
    console.error('Error playing/stopping sound:', error);
  }
};

export default function TabLayout(){
  const colorScheme = useColorScheme();
  const [showMainMenu, setShowMainMenu] = useState<boolean>(false);
  const unityGameRef = useRef<UnityGameRef>(null);

  const handleUnityMessage =(message: string) =>{
    if(message === 'Start'){
      setShowMainMenu(true);
      playSound(true);
    }else if(message === 'Game loaded' || message === 'Unload'){
      setShowMainMenu(false);
      playSound(false);
    }else if(message.startsWith('Score')){
      const score = message.split(" ")[1];
      console.log(score);
      //saveScore(score); AQUI GUARDAR SCORE
    }
  };

  const handleModalClose =() =>{
    if(unityGameRef.current){
      unityGameRef.current.resumeUnity();
    }
  };

  return(
    <View style={{ flex: 1 }}>
    {showMainMenu && <MainMenu onCloseModal={handleModalClose}/>}
      <UnityGame ref={unityGameRef}onUnityMessage={handleUnityMessage}/>
    </View>
  );
}
