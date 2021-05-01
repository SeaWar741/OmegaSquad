import { SET_USERNAME } from "./actionType";

const INIT_STATE = {
    username: localStorage.getItem("username") || null
}

const username = (state = INIT_STATE, action) => {
    switch(action.type){
        case SET_USERNAME: 
            return {
                ...state,
                username: action.data
            }
        default:
            return state
    }
}

export default username;