import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Pressable} from 'react-native';
import { Colors } from '@/constants/Colors';
import CoinsSvg from '../assets/images/icons/CoinIcon.svg';

export default function ButtonPrimary(props: { amount?: number; onPress?: () => void; }) {
    const { amount = 0, onPress } = props;
    const formattedAmount = amount > 99999999 ? '99999999+' : amount;

    return (
        <Pressable onPress={onPress}>
            <View style={styles.buttonWrapper}>
                <View style={styles.buttonPrimary}>
                    <View style={styles.insetBorder}>
                        <CoinsSvg width={30} height={30} />
                    </View>
                </View>
                <View style={styles.coinTag}>
                    <Text style={styles.textTag}>{formattedAmount}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    buttonPrimary: {
        zIndex: 2,
        height: 60,
        width: 60,
        backgroundColor: Colors.lightBlue,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    insetBorder: {
        width: 55,
        height: 55,
        padding: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    coinTag: {
        zIndex: 1,
        width: 120,
        height: 50,
        backgroundColor: '#F1E3FF',
        position: 'absolute',
        top: 25,
        borderColor: Colors.lightBlue,
        borderWidth: 3,
        left: '50%',
        alignItems: 'flex-end',
        paddingEnd: 4,
        justifyContent: 'center',
        borderBottomRightRadius: 10,
    },
    textTag: {
        fontFamily: 'CrystalRadioKit',
        color: Colors.lightBlue,
    }
});