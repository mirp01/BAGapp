import React from 'react';
import { StyleSheet, View, Pressable, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

type OptionButtonProps = {
    isOpen?: boolean;
    title: string;
    type: string;
    hasMargin?: boolean;
};

const getButtonBackgroundColor = (type: string) => {
    switch (type) {
        case 'normal':
            return {
                backgroundColor: Colors.purple,
                gradient: null,
            };
        case 'important':
            return {
                gradient: ['#E71D36', '#FF9F1C'],
            };
        case 'extra':
            return {
                gradient: ['#12664F', '#2C497F'],
            };
        default:
            return {
                backgroundColor: Colors.purple,
                gradient: null,
            };
    }
};

export default function ButtonPrimary(props: OptionButtonProps) {
    const { isOpen = false, title = 'title', type = 'normal', hasMargin = false } = props;
    const { backgroundColor, gradient } = getButtonBackgroundColor(type);

    return (
        <Pressable style={[styles.buttonPrimary, hasMargin && { marginBottom: 5 }]}>
            {gradient ? (
                <LinearGradient colors={gradient} style={styles.buttonContent}>
                    <View style={styles.insetBorder}>
                        <Text style={styles.buttonText}>{title}</Text>
                    </View>
                </LinearGradient>
            ) : (
                <View style={[{ backgroundColor }, styles.buttonContent]}>
                    <View style={styles.insetBorder}>
                        <Text style={styles.buttonText}>{title}</Text>
                    </View>
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonPrimary: {
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.45,
        shadowRadius: 12,
        elevation: 12,
    },
    buttonContent: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    insetBorder: {
        width: '98%',
        height: 45,
        borderColor: 'white',
        borderWidth: 2,
        margin: 4,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'CrystalRadioKit',
        color: '#FFFFFF',
        fontSize: 20,
    },
});