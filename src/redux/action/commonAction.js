import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { AUTH_CREATE_FAILURE, AUTH_CREATE_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_LOGIN_SUCCESS, CURRENT_USER,GET_EVENTS } from "../../common/constant";
import { auth, db } from "../../servies/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const GetEvents = () => {
   return async (dispatch)=>{
     try {
        const res=  await getDocs(collection(db,"events"))
        const data = [];
        res.forEach((doc) =>data.push(doc.data()));
        dispatch({type: GET_EVENTS, payload: data});
     } catch (error) {
        console.error(error);
     }
    };
  };

  export const CreateUserAuth=(user,navigate)=>{
    return async (dispatch) => {
        try {
            const res = await createUserWithEmailAndPassword(auth,user.email,user.password)
            await setDoc(doc(db, "users", res.user.uid), {...user,id:res.user.uid})
            dispatch({ type: AUTH_CREATE_SUCCESS, payload: res });
            navigate("/login");
        } catch (error) {
            console.error(error);
            dispatch({ type: AUTH_CREATE_FAILURE, payload: error.code });
        }
    };
  }
 
  export const LoggedUserAuth = (user,navigate) => {
    return async (dispatch) => {
        try {
           const res= await signInWithEmailAndPassword(auth, user.email, user.password)
            dispatch({ type: AUTH_LOGIN_SUCCESS, payload: res });
            navigate("/");
        } catch (error) {
            dispatch({ type: AUTH_LOGIN_FAILURE, payload: error.code });
        }
    };
  };


  export const CurrentUserAuth = (id = "") => {
    
    return async (dispatch) => {
        try {
            const res = await getDoc(doc(db, "users", id))
            console.log('res: ', res?.data());
            dispatch({ type: CURRENT_USER, payload: res?.data() });
        } catch (error) {
            console.error(error);
        }
    };
    
  };