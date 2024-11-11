import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Button, Pressable } from 'react-native';
import { useRouter } from "expo-router";
import CloseSVG from '../assets/images/icons/close.svg';
import  OptionButton from '@/components/OptionButtonPrimary';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { Colors } from '@/constants/Colors';

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = process.env.EXPO_PUBLIC_CLIENT_ID_GOOGLE_ANDROID;
const REDIRECT_URI = 'com.pamsann.GoodSoup://auth';

const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
  };

interface UserInfo {
    name: string;
    email: string;
    picture: string;
}

export default function Login() {
    console.log("CLIENT_ID:", CLIENT_ID);
    console.log("REDIRECT_URI:", REDIRECT_URI);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const router = useRouter();

    if (!CLIENT_ID || !REDIRECT_URI) {
        console.error("CLIENT_ID or REDIRECT_URI is undefined.");
        return null;
    }

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: CLIENT_ID,
            redirectUri: REDIRECT_URI,
            scopes: ['openid', 'profile', 'email'],
        },
        discovery
    );

    useEffect(() => {
        if (response?.type === 'success') {
          const { id_token } = response.params;
    
          // Fetch user info from Google
          fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`)
            .then((response) => response.json())
            .then((data) => {
              setUserInfo(data);
            })
            .catch((err) => console.error(err));
        }
    }, [response]);

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
                    //promptAsync();
                }}
            />

            {userInfo && (
                <View>
                <Text>Name: {userInfo.name}</Text>
                <Text>Email: {userInfo.email}</Text>
                <Text>Picture: {userInfo.picture}</Text>
                </View>
            )}
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