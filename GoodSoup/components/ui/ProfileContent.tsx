import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Pressable, ActivityIndicator, TextInput } from 'react-native';
import { Image } from 'expo-image';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import OptionButton from '@/components/OptionButtonPrimary';
import { Colors } from '@/constants/Colors';
import { useRouter } from "expo-router";
import Slider from '@react-native-community/slider';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getUserData } from '../../config/getData';
import { testUserID } from '@/constants/testuser';
import { handleEditName, handleEditButton, closeEdit } from './utils/editName';

interface User {
    username: string;
    coins: number;
    score: number;
}

export function ProfileModalContent() {
    const [musicValue, setMusicValue] = useState(50);
    const [sfxValue, setSfxValue] = useState(50);
    const [showPreferencesContainer, setShowPreferencesContainer] = useState(false);
    const [userData, setUserData] = useState<User | null>(null);
    const [newusername, setNewUsername] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<TextInput>(null);

    const router = useRouter();

    const handleOnPressPreferences = () => {
        setShowPreferencesContainer(!showPreferencesContainer);
    }

    const icon = showPreferencesContainer ? (
        <AntDesign name="up" size={24} color="#DDDDDD" style={{ marginRight: 10 }} />
    ) : (
        <AntDesign name="down" size={24} color="#DDDDDD" style={{ marginRight: 10 }} />
    );

    useEffect(() => {
        getUserData(testUserID).then(data => {
          setUserData(data);
        });
    }, [testUserID]);

    return (
        <>
            <Text style={styles.profileTitle}>Mi cuenta</Text>
            <Image style={styles.profileImage}
                source={require('../../assets/images/pp.png')}
            />
            <View style={{ flexDirection: 'row' }}>
                {userData ? (
                    !isEditing ? (
                    <>
                        <Text style={styles.profileName}>{userData.username}</Text>
                    </>
                    ) : (
                        <></>
                    )
                ) : (
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" color="white" />
                    </View>
                )}
                <Pressable onPress={() => handleEditButton(setIsEditing, inputRef)}>
                {!isEditing ? (
                    <MaterialIcons name="mode-edit" size={30} color="#DDDDDD" style={{ marginLeft: 5, marginTop: 3 }} />
                ) : (
                    <></>
                )}
                </Pressable>
                {isEditing && (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15}}>
                        <TextInput
                            ref={inputRef}
                            style={{
                            height: 40,
                            minWidth: 250,
                            width: 300,
                            backgroundColor: 'white',
                            paddingLeft: 10,
                            fontSize: 16,
                            borderRadius: 10,
                            }}
                            placeholder="Editar nombre de usuario"
                            value={newusername}
                            onChangeText={(text) => setNewUsername(text)}
                            onSubmitEditing={() => handleEditName(testUserID, newusername, setUserData, setIsEditing)}
                        />
                        <Pressable onPress={() => closeEdit(setIsEditing)}>
                            <View style={{ position: 'absolute', right: 5, top: -15,}}> 
                                <Ionicons name="close" size={30} color="#a2a2a2"/>
                            </View>
                        </Pressable>
                    </View>
                    
                )}
            </View>
            <View style={styles.scoreContainer}>
                <View style={styles.scoreRow}>
                    <Text style={styles.score}>Mi puntuación {'\n'}total</Text>
                    {userData ? (
                        <>
                        <Text style={styles.score}>{userData.score}</Text>
                        </>
                    ) : (
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="large" color="white" />
                        </View>
                    )}
                </View>
                <View style={[styles.scoreRow, { marginBottom: 20 }]}>
                    <Text style={styles.score}>Mis monedas</Text>
                    {userData ? (
                        <>
                        <Text style={styles.score}>{userData.coins}</Text>
                        </>
                    ) : (
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="large" color="white" />
                        </View>
                    )}
                </View>
            </View>
            <OptionButton 
                title='Preferencias' 
                type='normal' 
                hasMargin 
                onPress={handleOnPressPreferences} 
                hasIcon 
                icon={icon}  
            />
            <View style={[styles.preferencesContainer, { display: showPreferencesContainer ? 'flex' : 'none', opacity: showPreferencesContainer ? 1 : 0, }]}>
                    <Text style={styles.textStyle}>Música</Text>
                <Slider
                    style={{width: 330, height: 30}}
                    minimumValue={0}
                    maximumValue={100}
                    thumbTintColor="#DDDDDD"
                    minimumTrackTintColor="#DDDDDD"
                    maximumTrackTintColor="#DDDDDD"
                    step={1}
                    value={musicValue}
                    onValueChange={setMusicValue}
                />
                <View style={[styles.smallContainer, {marginBottom: 20}]}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="volume-low" size={24} color="#DDDDDD" />
                        <Text style={styles.textStyle}>{musicValue}</Text>
                    </View>
                    <Ionicons name="volume-high" size={24} color="#DDDDDD" />
                </View>
                <Text style={styles.textStyle}>SFX</Text>
                <Slider
                    style={{width: 330, height: 30}}
                    minimumValue={0}
                    maximumValue={100}
                    thumbTintColor="#DDDDDD"
                    minimumTrackTintColor="#DDDDDD"
                    maximumTrackTintColor="#DDDDDD"
                    step={1}
                    value={sfxValue}
                    onValueChange={setSfxValue}
                />
                <View style={styles.smallContainer}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="volume-low" size={24} color="#DDDDDD" />
                        <Text style={styles.textStyle}>{sfxValue}</Text>
                    </View>
                    <Ionicons name="volume-high" size={24} color="#DDDDDD" />
                </View>
            </View>
            <OptionButton title='Contacta soporte' type='extra' hasMargin />
            <OptionButton title='Datos y privacidad' type='extra' hasMargin />
            <OptionButton title='Iniciar sesión' type='extra' hasMargin onPress={() => {
                router.push('/login');
            }} />
            <OptionButton title='Cerrar sesión' type='important' hasMargin />
            <View style={{marginBottom: 40}}></View>
        </>
    );
};

const styles = StyleSheet.create({
    profileTitle: {
        fontFamily: 'CrystalRadioKit',
        color: Colors.cerise,
        fontSize: 28,
        marginBottom: 20,
    },
    profileImage:{
        height: 150,
        width: 150,
        marginBottom: 20,
        borderRadius: 150 / 2,
        overflow: 'hidden',
    },
    profileName: {
        fontFamily: 'CrystalRadioKit',
        color: '#DDDDDD',
        fontSize: 30,
        marginBottom: 20,
    },
    scoreContainer: {
        flexDirection: 'column',
        width: '90%',
    },
    scoreRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    score: {
        fontFamily: 'Alphakind',
        color: '#DDDDDD',
        fontSize: 18,
        width: '50%',
        textAlign: 'center',
    },
    preferencesContainer: {
        padding: 10,
        alignContent: 'flex-start',
        justifyContent: 'center',
    },
    textStyle: {
        fontFamily: 'Alphakind',
        color: '#DDDDDD',
        fontSize: 16,
        marginLeft: 15,
    },
    smallContainer: {
        flexDirection: 'row', 
        alignContent: 'space-around',
    },
    iconContainer: {
        flexDirection: 'row', 
        width: '83%', 
        marginLeft: 15 
    },
});