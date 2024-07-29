import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { AUTH_FAILURE, AUTH_SUCCESS, CURRENT_USER, GET_EVENTS } from "../../common/constant";
import { auth, db } from "../../servies/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { fetchUserRole } from "../../common/common";

export const GetEvents = () => {
    return async (dispatch) => {
        try {
            const res = await getDocs(collection(db, "events"))
            const data = [];
            res.forEach((doc) => data.push(doc.data()));
            dispatch({ type: GET_EVENTS, payload: data });
        } catch (error) {
            console.error(error);
        }
    };
};

export const CreateUserAuth = (user, navigate) => {
    return async (dispatch) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, user.email, user.password)
            await setDoc(doc(db, "users", res.user.uid), { ...user, id: res.user.uid })
            dispatch({ type: AUTH_SUCCESS, payload: res });
            navigate("/login");
        } catch (error) {
            console.error(error);
            dispatch({ type: AUTH_FAILURE, payload: error.code });
        }
    };
}

export const LoggedUserAuth = (user, navigate) => {
    return async (dispatch) => {
        try {
            const res = await signInWithEmailAndPassword(auth, user.email, user.password)
            const userDoc = {
                uid: res.user.uid,
                email: res.user.email,
                role: await fetchUserRole(res.user.uid) // Fetch the role from your user data source
            };
            dispatch({ type: AUTH_SUCCESS, payload: userDoc });
            if (userDoc.role === 'admin') {
                navigate('/dashboard');
            } else {
                navigate('/');
            }
        } catch (error) {
            dispatch({ type: AUTH_FAILURE, payload: error.code });
        }
    };
};


export const CurrentUserAuth = (id) => {
    localStorage.setItem("currentUser", JSON.stringify(id));
    return async (dispatch) => {
        try {
            const res = await getDoc(doc(db, "users", id))
            dispatch({ type: CURRENT_USER, payload: res?.data() || {} });
        } catch (error) {
            console.error(error);
        }
    };

};