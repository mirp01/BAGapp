import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, Button } from 'react-native';
import { useRouter } from "expo-router";
import CloseSVG from '../assets/images/icons/close.svg';
import  OptionButton from '@/components/OptionButtonPrimary';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { Colors } from '@/constants/Colors';
import { GoogleSignin, GoogleSigninButton, SignInResponse } from '@react-native-google-signin/google-signin';

//WebBrowser.maybeCompleteAuthSession(); // to dismiss the web popup


export default function Login() {
    // const [userInfo, setUserInfo] = useState<SignInResponse | null>(null);

    const router = useRouter();

    // const configureGoogleSignin = () => {
    //     GoogleSignin.configure({
    //         //androidClientId: "1005960240270-ru3p2e5d5oq0o1m34iq4r1j7blipaqpa.apps.googleusercontent.com",
    //     })
    // };
    // useEffect(() => {
    //     configureGoogleSignin();
    // });
    
    // const signIn = async () => {
    //     console.log("Pressed");
    //     try{
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         setUserInfo(userInfo);
    //     } catch(e) {
    //         console.log("Error: ", e);
    //     }
    // };
    // const logOut = () => {
    //     setUserInfo(null);
    //     GoogleSignin.revokeAccess();
    //     GoogleSignin.signOut();
    // }

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
            {/* <GoogleSigninButton
                size={GoogleSigninButton.Size.Standard}
                color={GoogleSigninButton.Color.Dark}
                //onPress={signIn}
            /> */}
            {/* {userInfo ? (
                <Button title="logout" onPress={logOut} />
            ) : (
                <Text>No userInfo</Text>
            )} */}
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