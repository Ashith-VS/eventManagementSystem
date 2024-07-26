import { doc, getDoc } from "firebase/firestore";
import { db } from "../servies/firebase";

export const fetchUserRole = async (uid) => {
    console.log('uid: ', uid);
    // Fetch user data from your database or user management service
    // Example for Firebase Firestore:
    const userDoc = await getDoc(doc(db, 'users', uid));
    console.log('userDoc: ', userDoc.exists());
    console.log('userDoc.data().role : ', userDoc.data().role);
    return userDoc.exists() ? userDoc.data().role : 'user'; // Return role or default to 'user'
};