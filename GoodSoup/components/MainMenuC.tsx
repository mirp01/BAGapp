import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import  ButtonPrimary from '@/components/ButtonPrimary';
import  ButtonCoin from '@/components/ButtonCoin';
import  Modal from '@/components/Modal';

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
                <ButtonCoin amount={100} onPress={() => openModal(<Text>Hola</Text>)} />
            </View>
            <View style={styles.buttonContainer}>
                <ButtonPrimary title = 'profile' hasMargin onPress={() => openModal(<Text>Hola</Text>)}/>
                <ButtonPrimary title = 'rewards' hasMargin onPress={() => openModal(<Text>Hola</Text>)}/>
                <ButtonPrimary title = 'rankings' onPress={() => openModal(<Text>Hola</Text>)}/>
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
});