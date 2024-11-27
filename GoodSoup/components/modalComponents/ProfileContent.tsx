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
import { setUserParameter } from '../../config/setUser';
import { testUserID } from '@/constants/testuser';

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

    const handleEditName = async (userId: string, newUsername: string) => {
        try {
            const success = await setUserParameter(userId, 'username', newUsername, 0);
            if (success) {
            console.log('User data was successfully set/updated.');
            const updatedUserData = await getUserData(userId);
            if (updatedUserData) {
                setUserData(updatedUserData); // Update the state with the new user data
            }
            setIsEditing(false);
            } else {
            console.log('Failed to set/update user data.');
            }
        } catch (error) {
            console.error('Error in handleEditName:', error);
        }
    }
    const handleEditButton = () => {
        setIsEditing(true);
        inputRef.current?.focus();
    };
    const closeEdit = () => {
        setIsEditing(false);
    }

    const handleOnPressPreferences = () => {
        setShowPreferencesContainer(!showPreferencesContainer);
    }
    const handleOnPressLogOut = () => {
        console.log("Log Out button pressed");
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
                source={{ uri: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" }}
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
                <Pressable onPress={handleEditButton}>
                {!isEditing ? (
                    <MaterialIcons name="mode-edit" size={30} color="#DDDDDD" style={{ marginLeft: 5, marginTop: 3 }} />
                ) : (
                    <></>
                )}
                </Pressable>
                {isEditing && (
                    <View style={{marginBottom: 10, flexDirection: 'row', flex: 1, position: 'relative'}}>
                        <TextInput
                            ref={inputRef}
                            style={{
                            height: 40,
                            minWidth: 300,
                            backgroundColor: 'white',
                            marginTop: 20,
                            paddingLeft: 10,
                            }}
                            placeholder="Nuevo nombre de usuario"
                            value={newusername}
                            onChangeText={(text) => setNewUsername(text)}
                            onSubmitEditing={() => handleEditName(testUserID, newusername)}
                        />
                        <Pressable onPress={closeEdit}>
                            <Ionicons name="close" size={26} color="purple" style={{position: 'absolute', top: 25, right: 10}} />
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
            <OptionButton title='Cerrar sesión' type='important' hasMargin onPress={handleOnPressLogOut} />
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