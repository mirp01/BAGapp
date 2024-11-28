import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '@/constants/Colors';

interface ScoreModalProps {
    score: string;
}

export function ScoreModal({score}: ScoreModalProps) {

    return (
        <>
        <View style={styles.rewardContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>¡Obtuviste {score} puntos!</Text>
            </View>
            
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    rewardContainer: {
        width: '100%',
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
        fontSize: 22,
        marginBottom: 20,
        padding: 10,
    },
})

