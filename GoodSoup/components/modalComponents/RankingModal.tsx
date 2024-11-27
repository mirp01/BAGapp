import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '@/constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { getTopUsers } from '../../config/getTopUsers';
import { testUserID } from '@/constants/testuser';

interface User {
    username: string;
    coins: number;
    score: number;
}

export function RankingModal() {
  const [topUsers, setTopUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch the top users when the component mounts
    async function fetchTopUsers() {
      const users = await getTopUsers();
      setTopUsers(users);
    }

    fetchTopUsers();
  }, []);

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
        {topUsers.map((user, index) => (
            <View key={index} style={styles.row}>
              <View style={styles.rankingPlace}>
                <Text
                  style={[styles.rankingText, { color: index < 3 ? '#FF9F1C' : '#FFFFFF' }]}>
                  {index + 1}
                </Text>
                {index < 3 && (
                  <MaterialCommunityIcons name="crown" size={26} color='#FF9F1C' style={{ marginLeft: 5 }} />
                )}
                <Text
                  style={[styles.rankingText, { color: index < 3 ? '#FF9F1C' : '#FFFFFF' }]}>
                  {user.username}
                </Text>
              </View>
              <Text
                style={[styles.rankingText, { color: index < 3 ? '#FF9F1C' : '#FFFFFF' }]}>
                {user.score}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  rankingContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
  profileImage: {
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
    backgroundColor: '#DDDDDD',
  },
});