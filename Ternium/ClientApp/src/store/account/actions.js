import { SET_USERNAME } from "./actionType";

export const setUsername = (username) => {
    localStorage.setItem("username", username)
    console.log("REDUX > username: ", username)
    return {
        type: SET_USERNAME,
        data: username
    }
};
