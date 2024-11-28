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
    id: number;
}

export function RankingModal() {
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [userInTop, setuserInTop] = useState(false);

  useEffect(() => {
    async function fetchTopUsers() {
      const users = await getTopUsers();
      setTopUsers(users);
      const userInTop = users.some((user) => user.id === Number(testUserID));
      setuserInTop(userInTop);
    }
    fetchTopUsers();
  }, []);

  return (
    <>
      <View style={styles.rankingContainer}>
        <Text style={styles.title}>Ranking Nacional</Text>
        <View style={styles.topImagesContainer}>
                <Image style={[styles.profileImage, {zIndex: 1, position: 'absolute' }]}
                    source={require('../../assets/images/pp.png')}
                />
                <Image style={[styles.profileImage, {zIndex: 0, marginRight: 50, height: 110, width: 110, borderRadius: 110 / 2, }]}
                    source={require('../../assets/images/pp.png')}
                />
                <Image style={[styles.profileImage, {zIndex: 0, height: 110, width: 110, borderRadius: 110 / 2,}]}
                    source={require('../../assets/images/pp.png')}
                />
        </View>
        
        <View style={styles.rankTableContainer}>
  {topUsers.map((user, index) => (
    <React.Fragment key={index}> 
      <View style={styles.row}>
        <View style={styles.rankingPlace}>
          <Text
            style={[
              styles.rankingText,
              { 
                color: userInTop && user.id === Number(testUserID) 
                  ? '#481c68' 
                  : index < 3 
                  ? '#FF9F1C' 
                  : '#FFFFFF',
              },
            ]}
          >
            {index + 1}
          </Text>
          {index < 3 && (
            <MaterialCommunityIcons
              name="crown"
              size={26}
              color="#FF9F1C"
              style={{ marginLeft: 5 }}
            />
          )}
          <Text
            style={[
              styles.rankingText,
              { 
                color: userInTop && user.id === Number(testUserID)
                  ? '#481c68'
                  : index < 3
                  ? '#FF9F1C'
                  : '#FFFFFF',
              },
            ]}
          >
            {user.username}
          </Text>
        </View>
        <Text
          style={[
            styles.rankingText,
            {
              color: userInTop && user.id === Number(testUserID)
                ? '#481c68'
                : index < 3
                ? '#FF9F1C'
                : '#FFFFFF',
            },
          ]}
        >
          {user.score}
        </Text>
      </View>
      <View style={styles.divider} />
    </React.Fragment>
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
    marginBottom: 5
  },
});