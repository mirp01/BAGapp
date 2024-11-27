import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, Button } from 'react-native';
import { useRouter } from "expo-router";
import CloseSVG from '../assets/images/icons/close.svg';
import  OptionButton from '@/components/OptionButtonPrimary';
import { Colors } from '@/constants/Colors';

export default function Login() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Pressable style={styles.closeButton} onPress={() => {
                router.push('/');
            }}>
                <CloseSVG width="30" height="30" />
            </Pressable>
            <ImageBackground source={require('../assets/images/brush01_03Y.png')} style={styles.circlesTop} />
            <ImageBackground source={require('../assets/images/brush01_03Y.png')} style={styles.circlesBottom} />
            <Text style={styles.title}>Inicia Sesión</Text>
            <View style={styles.buttonContainer}>
            <OptionButton 
                title = 'Sign in con Google' 
                type = 'normal' 
                onPress={() => {
                    console.log("Sign in with Google button pressed"); 
                }}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 2,
    },
    circlesTop: {
        width: 185,
        height: 167,
        opacity: 0.25,
        padding: 0,
        resizeMode: 'cover',
        overflow: 'hidden',
        position: 'absolute',
        top: 150,
        right: -65,
        zIndex: 0,
    },
    circlesBottom: {
        width: 185,
        height: 167,
        opacity: 0.25,
        padding: 0,
        resizeMode: 'cover',
        overflow: 'hidden',
        position: 'absolute',
        bottom: 150,
        left: -40,
        zIndex: 0,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#481C68'
    },
    buttonContainer: {
        width: '85%',
    },
    title: {
        fontFamily: 'Alphakind',
        color: Colors.cerise,
        fontSize: 24,
        marginBottom: 30,
    },
    normal: {
        fontFamily: 'Alphakind',
        color: '#DDDDDD',
    },
});