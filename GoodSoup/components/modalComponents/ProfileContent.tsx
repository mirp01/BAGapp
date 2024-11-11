import { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import OptionButton from '@/components/OptionButtonPrimary';
import { Colors } from '@/constants/Colors';
import { useRouter } from "expo-router";
import Slider from '@react-native-community/slider';
import AntDesign from '@expo/vector-icons/AntDesign';


export function ProfileModalContent() {
    const [musicValue, setMusicValue] = useState(50);
    const [sfxValue, setSfxValue] = useState(50);
    const [showPreferencesContainer, setShowPreferencesContainer] = useState(false);

    const router = useRouter();

    const handleEditName = () => {
        console.log("Edit name button pressed");
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

    return (
        <>
            <Text style={styles.profileTitle}>Mi cuenta</Text>
            <Image style={styles.profileImage}
                source={{ uri: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" }}
            />
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.profileName}>John Doe</Text>
                <Pressable onPress={handleEditName}>
                    <MaterialIcons name="mode-edit" size={30} color="#DDDDDD" style={{ marginLeft: 5, marginTop: 3 }} />
                </Pressable>
            </View>
            <View style={styles.scoreContainer}>
                <View style={styles.scoreRow}>
                    <Text style={styles.score}>Mi puntuación {'\n'}total</Text>
                    <Text style={styles.score}>5000000</Text>
                </View>
                <View style={[styles.scoreRow, { marginBottom: 20 }]}>
                    <Text style={styles.score}>Mis monedas</Text>
                    <Text style={styles.score}>10</Text>
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