import { AUTH_FAILURE, AUTH_SUCCESS, CURRENT_USER, GET_EVENTS } from "../../common/constant"

const initialState = {
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || {},
    getUser: [],
    AuthSuccess: {},
    AuthFailure: false
};

export default function Reducers(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, AuthSuccess: action.payload }
        case AUTH_FAILURE:
            return { ...state, AuthFailure: action.payload }
        case CURRENT_USER:
            return { ...state, currentUser: action.payload }
        case GET_EVENTS:
            return { ...state, getUser: action.payload }
        default:
            return state
    }
}