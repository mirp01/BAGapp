import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import  ButtonPrimary from '@/components/ButtonPrimary';
import  ButtonCoin from '@/components/ButtonCoin';
import  Modal from '@/components/Modal';
import  OptionButton from '@/components/OptionButtonPrimary';
import { ProfileModalContent } from '@/components/modalComponents/ProfileContent';
import { DailyModalContent } from '@/components/modalComponents/DailyContent';
import { AnuncioModal } from '@/components/modalComponents/AnuncioModal';
import { RankingModal } from '@/components/modalComponents/RankingModal';
import { Colors } from '@/constants/Colors';

interface MainMenuProps {
  onCloseModal?: () => void;
}

export function MainMenu({ onCloseModal }: MainMenuProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [modalColor, setModalColor] = useState<string>(Colors.purple);


    const openModal = (content: React.ReactNode, color: string) => {
        setModalContent(content);
        setModalVisible(true);
        setModalColor(color);
    };

    const closeModal = () => {
      setModalVisible(false);
      if(onCloseModal){
        onCloseModal();
      }
    };

    return (
        <View style={[styles.container, { position: 'absolute', top: 0, left: 0, right: 0 }]}>
            <View>
                <ButtonCoin amount={100} onPress={() => openModal(<AnuncioModal />, Colors.lightBlue )} />
            </View>
            <View style={styles.buttonContainer}>
                <ButtonPrimary title = 'profile' hasMargin onPress={() => openModal(<ProfileModalContent />, Colors.purple)}/>
                <ButtonPrimary title = 'rewards' hasMargin onPress={() => openModal(<DailyModalContent />, Colors.purple)}/>
                <ButtonPrimary title = 'rankings' onPress={() => openModal(<RankingModal />, Colors.cerise)}/>
            </View>

            <Modal isOpen={modalVisible} children={modalContent} modalColor={modalColor} onRequestClose={ closeModal }/>
        </View>
    );
}
    
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: "5%",
    paddingTop: "12%",
    justifyContent: "space-between",
    flexDirection: "row",
    zIndex: 4,
  },
  buttonContainer: {
    marginTop: "10%",
  },
  normal: {
    fontFamily: 'Alphakind',
    color: '#DDDDDD',
  },
  funky: {
    fontFamily: 'CrystalRadioKit',
    color: '#DDDDDD',
  },
});