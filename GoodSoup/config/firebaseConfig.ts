import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, update, onValue, orderByChild, limitToLast } from 'firebase/database';

const firebaseConfig: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    databaseURL?: string; 
} = {
    // add configurations
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, get, set, update, onValue,  };