import React from 'react';
import { StyleSheet, View, Pressable, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

type OptionButtonProps = {
    isOpen?: boolean;
    title: string;
    type: string;
    hasMargin?: boolean;
    hasIcon?: boolean; 
    icon?: React.ReactNode;
    onPress?: () => void; 
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
    const { isOpen = false, title = 'title', type = 'normal', hasMargin = false, hasIcon = false, icon, onPress } = props;
    const { backgroundColor, gradient } = getButtonBackgroundColor(type);

    return (
        <Pressable style={[styles.buttonPrimary, hasMargin && { marginBottom: 10 }]} onPress={onPress} >
            {gradient ? (
                <LinearGradient colors={gradient} style={styles.buttonContent}>
                    <View style={styles.insetBorder}>
                        <Text style={styles.buttonText}>{title}</Text>
                    </View>
                </LinearGradient>
            ) : (
                hasIcon ? (
                    <View style={[{ backgroundColor }, styles.buttonContent]}>
                        <View style={[styles.insetBorder, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                            <Text style={[styles.buttonText, {marginLeft: 10}]}>{title}</Text>
                            {icon && <View style={{ marginRight: 10 }}>{icon}</View>} 
                        </View>
                    </View>
                ) : (
                    <View style={[{ backgroundColor }, styles.buttonContent]}>
                        <View style={styles.insetBorder}>
                            <Text style={styles.buttonText}>{title}</Text>
                        </View>
                    </View>
                )
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