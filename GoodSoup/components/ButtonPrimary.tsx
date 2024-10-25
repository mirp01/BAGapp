import React from 'react';
import { StyleSheet, View, Pressable, TouchableOpacity} from 'react-native';
import { Colors } from '@/constants/Colors';
import profileSvg from '../assets/images/icons/ProfileIcon.svg';
import dailySvg from '../assets/images/icons/DailyIcon.svg';
import trophySvg from '../assets/images/icons/TrophyIcon.svg';

const IMAGE_MAPPING = {
    profile: profileSvg,
    rewards: dailySvg,
    rankings: trophySvg,
} as const;

type ImageKeys = keyof typeof IMAGE_MAPPING;

export default function ButtonPrimary(props: { title?: ImageKeys; onPress?: () => void; hasMargin?: boolean }) {
    const { title = 'profile', onPress, hasMargin = false } = props;
    const IconComponent = IMAGE_MAPPING[title];
    return (
        <Pressable style={[styles.buttonPrimary, hasMargin && { marginBottom: 10 }]} onPress={onPress}>
            <View style={styles.insetBorder}>
                <IconComponent width={30} height={30} />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonPrimary: {
        height: 60,
        width: 60,
        backgroundColor: Colors.purple,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'transparent',
    },
    insetBorder: {
        width: 55,
        height: 55,
        borderColor: 'white',
        borderWidth: 2,
        padding: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});