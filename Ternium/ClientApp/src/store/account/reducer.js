import { SET_USERNAME,SET_USERNAME_CODE,SET_USERNAME_TOKEN } from "./actionType";

const INIT_STATE = {
    username: localStorage.getItem("username") || null,
    usernameCode: localStorage.getItem("usernameCode") || null,
    usernameToken: localStorage.getItem("usernameToken") || null
}

const username = (state = INIT_STATE, action) => {
    switch(action.type){
        case SET_USERNAME: 
            return {
                ...state,
                username: action.data
            }
        case SET_USERNAME_CODE: 
            return {
                ...state,
                usernameCode: action.data
            }
        case SET_USERNAME_TOKEN: 
            return {
                ...state,
                usernameToken: action.data
            }
        
        default:
            return state
    }
}

export default username;