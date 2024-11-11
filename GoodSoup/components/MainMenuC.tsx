import React, {useState} from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import  ButtonPrimary from '@/components/ButtonPrimary';
import  ButtonCoin from '@/components/ButtonCoin';
import  Modal from '@/components/Modal';
import  OptionButton from '@/components/OptionButtonPrimary';
import { ProfileModalContent } from '@/components/modalComponents/ProfileContent';
import { DailyModalContent } from '@/components/modalComponents/DailyContent';
import { AnuncioModal } from '@/components/modalComponents/AnuncioModal';


export function MainMenu() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);


    const openModal = (content: React.ReactNode) => {
        setModalContent(content);
        setModalVisible(true);
    };


    return (
        <View style={styles.container}>
            <View>
                <ButtonCoin amount={100} onPress={() => openModal(<AnuncioModal /> )} />
            </View>
            <View style={styles.buttonContainer}>
                <ButtonPrimary title = 'profile' hasMargin onPress={() => openModal(<ProfileModalContent />)}/>
                <ButtonPrimary title = 'rewards' hasMargin onPress={() => openModal(<DailyModalContent />)}/>
                <ButtonPrimary title = 'rankings' onPress={() => openModal(
                    <>
                    <OptionButton title = 'Botón extra' type = 'extra' hasMargin/>
                    <OptionButton title = 'Botón importante' type = 'important' hasMargin/>
                    <OptionButton title = 'Botón normal' type = 'normal' />
                    </>
                )}/>
            </View>

            <Modal isOpen={modalVisible} children={modalContent} onRequestClose={() => setModalVisible(false)}/>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        height: "100%",
        width: "100%",
        padding: "5%",
        paddingTop: "12%",
        justifyContent: "space-between",
        flexDirection: "row",
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