import { database, ref, get, orderByChild, limitToLast } from './firebaseConfig';

interface User {
    username: string;
    coins: number;
    score: number;
}

export async function getTopUsers(): Promise<User[]> {
    try {
      const usersRef = ref(database, 'testUser'); // Reference to the 'testUser' node in your database
      const snapshot = await get(usersRef);
  
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        
        // Convert users object to an array
        const usersArray: User[] = Object.keys(usersData).map(key => ({
          username: usersData[key].username,
          coins: usersData[key].coins,
          score: usersData[key].score,
        }));
        
        // Sort users by score in descending order
        usersArray.sort((a, b) => b.score - a.score);
        
        // Get the top 10 users
        const topUsers = usersArray.slice(0, 10);
        
        return topUsers;
      } else {
        console.log('No data available');
        return [];
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
}