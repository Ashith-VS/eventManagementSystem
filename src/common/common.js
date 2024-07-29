import { doc, getDoc } from "firebase/firestore";
import { db } from "../servies/firebase";

export const fetchUserRole = async (uid) => {
    // Fetch user data from your database or user management service
    const userDoc = await getDoc(doc(db, 'users', uid));
    // console.log('userDoc: ', userDoc.exists());
    return userDoc.exists() ? userDoc.data().role : 'user'; 
};