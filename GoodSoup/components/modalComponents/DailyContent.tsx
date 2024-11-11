import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { RewardModal } from '@/components/modalComponents/RewardModal';

export function DailyModalContent() {
    const [daysInMonth, setDaysInMonth] = useState<(number | null)[]>([]);
    const [monthName, setMonthName] = useState('');
    const [currentDay, setCurrentDay] = useState<number | null>(null);
    const [showRewardModal, setShowRewardModal] = useState(false); 

    // Function to generate a calendar for the current month
    useEffect(() => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const totalDays = lastDayOfMonth.getDate();
        const startingDay = firstDayOfMonth.getDay();
        
        let daysArray: (number | null)[] = [];
        for (let i = 0; i < startingDay; i++) {
            daysArray.push(null);
        }
        
        for (let i = 1; i <= totalDays; i++) {
            daysArray.push(i);
        }

        setDaysInMonth(daysArray);
        setMonthName(firstDayOfMonth.toLocaleString('default', { month: 'long' }) + ' ' + currentYear);
        setCurrentDay(today.getDate());
    }, []);

    const weeks = [];
    let currentWeek = [];
    for (let i = 0; i < daysInMonth.length; i++) {
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
        currentWeek.push(daysInMonth[i]);
    }
    if (currentWeek.length) weeks.push(currentWeek);

    const handlePress = (day: number) => {
        if(day == currentDay){
            console.log(`Day ${day} pressed!`);
            setShowRewardModal(true); 
        }
    };

    return (
        <>
            {/* Conditionally render the reward modal */}
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
                                    // Only render the square if the day is not null
                                    day !== null ? (
                                        <Pressable key={dayIndex} style={styles.square} onPress={() => handlePress(day)}>
                                            {day === currentDay ? (
                                                <AntDesign name="questioncircle" size={26} color={Colors.lightBlue} />
                                            ) : (
                                                <Text style={styles.squareText}>{day}</Text>
                                            )}
                                        </Pressable>
                                    ) : (
                                        // If the day is null, render emptySquare to maintain square size
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