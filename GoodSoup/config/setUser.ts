import { database, ref, update } from './firebaseConfig';

export async function setUserParameter(userId: string, parameter: string, newUsername: string, newValue: number): Promise<boolean> {
  try {
    const userRef = ref(database, 'testUser/' + userId);
    
    if (parameter == "username") {
      await update(userRef, {
        username: newUsername
      });
    }
    else if (parameter == "coins") {
      await update(userRef, {
        coins: newValue
      });
    }
    else if (parameter == "score") {
      await update(userRef, {
        coins: newValue
      });
    }
    

    console.log('User data successfully updated to: ', parameter);
    return true;
  } catch (error) {
    console.error('Error updating user data:', error);
    return false;
  }
}