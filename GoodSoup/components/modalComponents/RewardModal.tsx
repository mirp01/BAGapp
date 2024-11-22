import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '@/constants/Colors';
import OptionButton from '@/components/OptionButtonPrimary';

interface RewardModalProps {
    setShowRewardModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RewardModal({ setShowRewardModal }: RewardModalProps) {
    const handleCloseModal = () => {
        setShowRewardModal(false); // Close the modal
    };

    return (
        <>
        <View style={styles.rewardContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>¡Has obtenido 20 monedas!</Text>
                <View style={styles.imageContainer}>
                    <Image style={styles.image}
                        source={require('../../assets/images/coinRewards.png')}
                    />
                </View>
                
                <OptionButton title='Cerrar' type='extra' hasMargin onPress={handleCloseModal} />
            </View>
            
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    rewardContainer: {
        width: '100%',
        height: 354,
        borderRadius: 20,
        backgroundColor: Colors.lightBlue,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        width: '90%',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'CrystalRadioKit',
        color: Colors.purple,
        fontSize: 20,
        marginBottom: 30,
        padding: 10,
    },
    imageContainer: {
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    image:{
        height: 150,
        width: 150,
        marginBottom: 40,
    },
})

