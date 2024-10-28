import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Button, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from "expo-router";
import CloseSVG from '../assets/images/icons/close.svg';
import  OptionButton from '@/components/OptionButtonPrimary';

interface UserInfo {
    id: string;
    email: string;
}

export default function Login() {
    const [token, setToken] = useState<string>("");
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const router = useRouter();

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: process.env.EXPO_PUBLIC_CLIENT_ID_GOOGLE_ANDROID,
        scopes: ['profile', 'email'],
     });

    useEffect(() => {
        handleEffect();
    }, [response, token]);

    async function handleEffect() {
        const user = await getLocalUser();
        console.log("user", user);
        if (!user) {
            if (response?.type === "success" && response.authentication) {
                // setToken(response.authentication.accessToken);
                await getUserInfo(response.authentication.accessToken);
            }
        } else {
            setUserInfo(user);
            console.log("loaded locally");
        }
    }
    
    const getLocalUser = async (): Promise<UserInfo | null> => {
        const data = await AsyncStorage.getItem("@user");
        if (!data) return null;
        return JSON.parse(data);
    };

    const getUserInfo = async (token: string | undefined): Promise<void> => {
        if (!token) return;
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
    
            const user: UserInfo = await response.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };
    
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
            <OptionButton title = 'Sign in con Google' type = 'normal' onPress={() => {
                console.log("Sign in with Google button pressed");
                promptAsync();
            }}/>
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
        color: '#e43962',
        fontSize: 24,
        marginBottom: 30,
    },
    normal: {
        fontFamily: 'Alphakind',
        color: '#DDDDDD',
    },
});