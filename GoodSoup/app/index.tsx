import React,{  useRef, useState }from 'react';
import{ MainMenu }from '@/components/MainMenuC';
import{ UnityGame, UnityGameRef }from '@/components/UnityGame';
import{ View }from 'react-native';
import{ useColorScheme }from '@/hooks/useColorScheme';
import{ Audio }from 'expo-av';
import { setUserParameter } from '@/config/setUser';
import { testUserID } from '@/constants/testuser';
import { ScoreModal } from '../components/ui/ScoreModal';
import { Colors } from '@/constants/Colors';

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
  const [showMainMenu, setShowMainMenu] = useState<boolean>(true); //OJO, change to false
  const unityGameRef = useRef<UnityGameRef>(null);
  const [newscore, setNewscore] = useState<string | null>(null);



  const handleUnityMessage = async (message: string) =>{
    if(message === 'Start'){
      setShowMainMenu(true);
      playSound(true);
    }else if(message === 'Game loaded' || message === 'Unload'){
      setShowMainMenu(false);
      playSound(false);
    }else if(message.startsWith('Score')){
      const score = message.split(" ")[1];
      console.log(score);
      try {
        await setUserParameter(testUserID, 'score', '', Number(score));
        setNewscore(score);
      } catch (e) {
        console.log("Error. ", e);
      }
    }
  };

  const handleModalClose =() =>{
    setNewscore(null);
    if(unityGameRef.current){
      unityGameRef.current.resumeUnity();
    }
  };

  return(
    <View style={{ flex: 1 }}>
    {showMainMenu && <MainMenu onCloseModal={handleModalClose}/>}
      {/* <UnityGame ref={unityGameRef}onUnityMessage={handleUnityMessage}/> */}
      {newscore && <ScoreModal score={newscore} />}
    </View>
  );
}
