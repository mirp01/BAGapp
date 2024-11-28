import { database, ref, get } from './firebaseConfig';

interface User {
    username: string;
    coins: number;
    score: number;
}

export async function getUserData(userId: string): Promise<User | null> {
    try {
      const userRef = ref(database, 'testUser/' + userId);
      const snapshot = await get(userRef);
  
      if (snapshot.exists()) {
        const userData: User = snapshot.val();
        console.log('User data:', userData);
        return userData; // Returning the fetched data
      } else {
        console.log('No data available');
        return null; // If no data is available for that userId
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
}