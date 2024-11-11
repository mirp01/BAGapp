import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal as RNModal, Pressable, ScrollView, ImageBackground, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import CloseSVG from '../assets/images/icons/close.svg';

type ModalProps = {
    isOpen?: boolean;
    children: React.ReactNode;
    onRequestClose?: () => void;
};

export default function Modal(props: ModalProps) {
    const { isOpen = false, children, onRequestClose, ...rest } = props;
    const [modalVisible, setModalVisible] = useState(isOpen);

    useEffect(() => {
        setModalVisible(isOpen);
    }, [isOpen]);

    const handleClose = () => {
        setModalVisible(false);
        if(onRequestClose)onRequestClose();
    };

    return (
        <RNModal visible={modalVisible} transparent={true} animationType="fade" {...rest} onRequestClose={handleClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                        <ImageBackground source={require('../assets/images/brush01_03Y.png')} style={styles.circles} />
                        <Pressable style={styles.closeButton} onPress={handleClose}>
                            <CloseSVG width="30" height="30" />
                        </Pressable>
                        <View style={styles.margin}>
                            <ScrollView contentContainerStyle={styles.scrollContent}>
                                {children}
                            </ScrollView>
                        </View>
                    </View>
            </View>
                
        </RNModal>
    );
}

const styles = StyleSheet.create({
    circles: {
        width: 185,
        height: 167,
        opacity: 0.25,
        padding: 0,
        resizeMode: 'cover',
        overflow: 'hidden',
        position: 'absolute',
        top: -30,
        left: -20,
        zIndex: 0,
    },
    modalContainer: {
        height: "100%",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        minHeight: 150,
        maxHeight: '90%',
        width: '90%',  
        backgroundColor: Colors.purple,
        borderRadius: 20,
        shadowColor: '#000',
        overflow: 'hidden',
    },
    scrollContent: {
        padding: 15,
        alignItems: 'center',
        display: 'flex',
    },
    margin: {
        minHeight: 150,
        maxHeight: '100%',
        margin: 10,
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 2,
        zIndex: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 2,
    }
});
