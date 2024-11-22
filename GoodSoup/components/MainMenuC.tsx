import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import  ButtonPrimary from '@/components/ButtonPrimary';
import  ButtonCoin from '@/components/ButtonCoin';
import  Modal from '@/components/Modal';
import  OptionButton from '@/components/OptionButtonPrimary';

interface MainMenuProps {
  onCloseModal?: () => void;
}

export function MainMenu({ onCloseModal }: MainMenuProps){
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);

    const openModal = (content: React.ReactNode) => {
        setModalContent(content);
        setModalVisible(true);
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
            <ButtonCoin amount={100} onPress={() => openModal(<Text>Hola</Text>)} />
          </View>
          <View style={styles.buttonContainer}>
            <ButtonPrimary title='profile' hasMargin onPress={() => openModal(<Text style={styles.normal}>Hola Este es el texto normal</Text>)} />
            <ButtonPrimary title='rewards' hasMargin onPress={() => openModal(<Text style={styles.funky}>Hola Este es el texto funky</Text>)} />
            <ButtonPrimary title='rankings' onPress={() => openModal(
              <>
                <OptionButton title='Botón extra' type='extra' hasMargin />
                <OptionButton title='Botón importante' type='important' hasMargin />
                <OptionButton title='Botón normal' type='normal' />
              </>
            )} />
          </View>
          <Modal isOpen={modalVisible} children={modalContent} onRequestClose={closeModal} />
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