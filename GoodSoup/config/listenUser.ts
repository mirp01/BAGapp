import { database, ref, onValue } from './firebaseConfig'; // Using onValue for real-time updates

interface User {
  username: string;
  coins: number;
  score: number;
}

export function listenUserData(userId: string, callback: (userData: User | null) => void) {
  const userRef = ref(database, 'testUser/' + userId);

  // Using onValue to listen for changes in real-time
  onValue(userRef, (snapshot) => {
    if (snapshot.exists()) {
      const userData: User = snapshot.val();
      console.log('User data updated:', userData);
      callback(userData); // Call the callback with the updated data
    } else {
      console.log('No data available');
      callback(null); // If no data is available, pass null to the callback
    }
  });
}