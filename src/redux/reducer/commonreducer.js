import { CURRENT_USER,GET_EVENTS } from "../../common/constant"

const initialState = {
    admin: [],
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || [],
    getUser: [],
  };

export default function Reducers(state=initialState,action){
    switch(action.type){
        case GET_EVENTS:
            return {...state, getUser:action.payload}
        case CURRENT_USER:
            // console.log('action.payload: ', action.payload);
            return {...state, currentUser:action.payload}
        default:
            return state
    }
}