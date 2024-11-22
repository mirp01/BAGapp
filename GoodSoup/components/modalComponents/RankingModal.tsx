import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '@/constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export function RankingModal() {

    return (
        <>
        <View style={styles.rankingContainer}>
            <Text style={styles.title}>Ranking Nacional</Text>
            <View style={styles.topImagesContainer}>
                <Image style={[styles.profileImage, {zIndex: 1, position: 'absolute' }]}
                    source={{ uri: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" }}
                />
                <Image style={[styles.profileImage, {zIndex: 0, marginRight: 50, height: 110, width: 110, borderRadius: 110 / 2, }]}
                    source={{ uri: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" }}
                />
                <Image style={[styles.profileImage, {zIndex: 0, height: 110, width: 110, borderRadius: 110 / 2,}]}
                    source={{ uri: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" }}
                />
            </View>
            <View style={styles.rankTableContainer}>
                <View style={styles.row}>
                    <View style={styles.rankingPlace}>
                        <Text style={[styles.rankingText, {color: '#FF9F1C',}]}>1</Text>
                        <MaterialCommunityIcons name="crown" size={26} color='#FF9F1C' style={{marginLeft: 5}} />
                        <Text style={[styles.rankingText, {color: '#FF9F1C',}]}>John Doe</Text>
                    </View>
                    <Text style={[styles.rankingText, {color: '#FF9F1C',}]}>5000000</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.row}>
                    <View style={styles.rankingPlace}>
                        <Text style={[styles.rankingText, {color: '#FF9F1C',}]}>2</Text>
                        <MaterialCommunityIcons name="crown" size={26} color='#FF9F1C' style={{marginLeft: 5}} />
                        <Text style={[styles.rankingText, {color: '#FF9F1C',}]}>John Doe</Text>
                    </View>
                    <Text style={[styles.rankingText, {color: '#FF9F1C',}]}>5000000</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.row}>
                    <View style={styles.rankingPlace}>
                        <Text style={[styles.rankingText, {color: '#FF9F1C',}]}>3</Text>
                        <MaterialCommunityIcons name="crown" size={26} color='#FF9F1C' style={{marginLeft: 5}} />
                        <Text style={[styles.rankingText, {color: '#FF9F1C',}]}>John Doe</Text>
                    </View>
                    <Text style={[styles.rankingText, {color: '#FF9F1C',}]}>5000000</Text>
                </View>
                <View style={styles.divider}></View>

                <View style={styles.row}>
                    <View style={styles.rankingPlace}>
                        <Text style={styles.rankingText}>4</Text>
                        <Text style={styles.rankingText}>John Doe</Text>
                    </View>
                    <Text style={styles.rankingText}>5000000</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.row}>
                    <View style={styles.rankingPlace}>
                        <Text style={styles.rankingText}>5</Text>
                        <Text style={styles.rankingText}>John Doe</Text>
                    </View>
                    <Text style={styles.rankingText}>5000000</Text>
                </View>
                <View style={styles.divider}></View>
            </View>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    rankingContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'CrystalRadioKit',
        color: '#DDDDDD',
        fontSize: 28,
        marginBottom: 20,
    },
    topImagesContainer: {
        height: 135,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
    },
    profileImage:{
        height: 135,
        width: 135,
        borderRadius: 135 / 2,
        overflow: 'hidden',
    },
    rankTableContainer: {
        width: '100%',
        alignItems: 'center',
    },  
    row: {
        width: '99%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 1,
        alignItems: 'center',
    },
    rankingText: {
        fontFamily: 'Alphakind',
        color: '#DDDDDD',
        fontSize: 20,
        marginLeft: 5,
    },
    rankingPlace: {
        flexDirection: 'row',
    },
    divider: {
        height: 1.5,
        width: '100%',
        backgroundColor: '#DDDDDD'
    }
})