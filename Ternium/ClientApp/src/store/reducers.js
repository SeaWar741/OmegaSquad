import { combineReducers } from "redux"

import username from "./account/reducer";



const rootReducer = combineReducers({
    usernameState: username
})

export default rootReducer