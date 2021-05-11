import { SET_USERNAME, SET_USERNAME_CODE, SET_USERNAME_TOKEN } from "./actionType";

export const setUsername = (username) => {
    localStorage.setItem("username", username)
    console.log("REDUX > username: ", username)
    return {
        type: SET_USERNAME,
        data: username
    }
};

export const setUsernameCode = (usernameCode) => {
    localStorage.setItem("usernameCode", usernameCode)
    console.log("REDUX > usernameCode: ", usernameCode)
    return {
        type: SET_USERNAME_CODE,
        data: usernameCode
    }
};

export const setUsernameToken = (usernameToken) => {
    localStorage.setItem("usernameToken", usernameToken)
    console.log("REDUX > usernameToken: ", usernameToken)
    return {
        type: SET_USERNAME_TOKEN,
        data: setUsernameToken
    }
};
