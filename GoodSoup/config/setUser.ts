import { database, ref, update, get } from './firebaseConfig';

export async function setUserParameter(userId: string, parameter: string, newUsername: string, newValue: number): Promise<boolean> {
  try {
    const userRef = ref(database, 'testUser/' + userId);
    const snapshot = await get(userRef);
    if(snapshot.exists()){
      const userData = snapshot.val();
      if (parameter == "username") {
        await update(userRef, {
          username: newUsername
        });
      }
      else if (parameter == "coins") {
        const currentCoins = userData.coins || 0;
        const updateCoins = newValue + currentCoins;
        await update(userRef, {
          coins: updateCoins
        });
      }
      else if (parameter == "score") {
        const currentScore = userData.score || 0;
        const updateScore = newValue + currentScore;
        await update(userRef, {
          score: updateScore
        });
      }


    }
    return true;
  } catch (error) {
    console.error('Error updating user data:', error);
    return false;
  }
}