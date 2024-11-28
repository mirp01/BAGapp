import { database, ref, onValue } from './firebaseConfig';

interface User {
  username: string;
  coins: number;
  score: number;
}

export function listenUserData(userId: string, callback: (userData: User | null) => void) {
  const userRef = ref(database, 'testUser/' + userId);

  onValue(userRef, (snapshot) => {
    if (snapshot.exists()) {
      const userData: User = snapshot.val();
      callback(userData); 
    } else {
      callback(null); // If no data is available, pass null to the callback
    }
  });
}