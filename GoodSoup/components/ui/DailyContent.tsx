import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { RewardModal } from '@/components/ui/RewardModal';
import { useCalendar } from '@/hooks/useCalendar';
import { setUserParameter } from '../../config/setUser';
import { testUserID } from '@/constants/testuser';

export function DailyModalContent() {
    const { weeks, monthName, currentDay } = useCalendar();
    const [showRewardModal, setShowRewardModal] = useState(false); 
    const [dailyRewardClaimed, setDailyRewardClaimed] = useState(false);
    
    const rewardKey = 'rewardKey';
    useEffect(() => {
        getData();
    }, []);

    const handlePress = async (day: number) => {
        if (day == currentDay && !dailyRewardClaimed) {
            await storeData(true);
            setDailyRewardClaimed(true);
            setShowRewardModal(true);

            // update coins
            try {
                const success = await setUserParameter(testUserID, 'coins', '', 20);
                if (success) {
                console.log('Coins granted!');
                } else {
                console.log('Failed to set/update user data.');
                }
            } catch (error) {
                console.error('Error in handleEditName:', error);
            }
        } else {
            console.log('Reward can only be claimed on the current day of the week.');
        }
    };
    
    const getData = async () => {
        try {
            const claimed = await AsyncStorage.getItem(rewardKey);
            if(claimed === 'true'){
                setDailyRewardClaimed(false);
            }
        } catch (e) {
            console.log("Error: " + e + ". Error reading data.");
        }
    };

    const storeData = async (claimed: boolean) => {
        try {
          await AsyncStorage.setItem('rewardKey', JSON.stringify(claimed));
        } catch (e) { 
          console.log("Error: " + e + ". Error storing data.");
        }
    };

    return (
        <>
        {showRewardModal ? (
            <RewardModal setShowRewardModal={setShowRewardModal} />
        ) : (
            <>
            <Text style={styles.profileTitle}>Recompensas diarias</Text>
            <View style={styles.calendarContainer}>
                <Text style={styles.monthTitle}>{monthName}</Text>
                <View style={styles.tableContainer}>
                    <View style={styles.row}>
                        <Text style={[styles.dayText, {color: Colors.cerise}]}>D</Text>
                        <Text style={styles.dayText}>L</Text>
                        <Text style={styles.dayText}>M</Text>
                        <Text style={styles.dayText}>M</Text>
                        <Text style={styles.dayText}>J</Text>
                        <Text style={styles.dayText}>V</Text>
                        <Text style={styles.dayText}>S</Text>
                    </View>
                    {weeks.map((week, index) => (
                        <View key={index} style={styles.row}>
                            {week.map((day, dayIndex) => (
                                day !== null ? (
                                    <Pressable key={dayIndex} style={styles.square} onPress={() => handlePress(day)}>
                                        {day === currentDay ? (
                                            dailyRewardClaimed ? (
                                                <Entypo name="check" size={24} color="green" />
                                            ) : (
                                                <AntDesign name="questioncircle" size={26} color={Colors.lightBlue} />
                                            )
                                        ) : (
                                            <Text style={styles.squareText}>{day}</Text>
                                        )}
                                    </Pressable>
                                ) : (
                                    <View key={dayIndex} style={styles.emptySquare} />
                                )
                            ))}
                        </View>
                    ))}
                </View>
            </View>
            </>
        )}
        </>
    );
}

const styles = StyleSheet.create({
    profileTitle: {
        fontFamily: 'CrystalRadioKit',
        color: Colors.cerise,
        fontSize: 28,
        marginBottom: 20,
    },
    calendarContainer: {
        height: 300,
        width: '100%',
        backgroundColor: Colors.yellow,
        borderRadius: 20,
        alignItems: 'center',
    },
    monthTitle: {
        fontFamily: 'CrystalRadioKit',
        color: '#ffffff',
        fontSize: 26,
        textAlign: 'center',
        padding: 10,
    },
    tableContainer: {
        width: '95%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 1,
    },
    dayText: {
        fontFamily: 'Alphakind',
        color: '#ffffff',
        fontSize: 22,
    },
    square: {
        width: 40,
        height: 40,
        backgroundColor: "#DDDDDD",
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#ED8F10",
        borderWidth: 2,
    },
    squareText: {
        fontFamily: 'Alphakind',
        color: Colors.blue,
        fontSize: 16,
    },
    emptySquare: {
        width: 40,
        height: 40,
        backgroundColor: Colors.yellow,
    },
    currentDayText: {
        color: "#ffffff",
    },
});