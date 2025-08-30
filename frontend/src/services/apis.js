
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const authEndpoints = {
    SIGN_UP : BASE_URL + "/signup" ,
    LOGIN : BASE_URL+"/login" ,
    LOGOUT : BASE_URL+"/logout",
    SET_PASSWORD : BASE_URL + "/set-password"
}

export const userEndpoints = {
    GET_USER_DETAILS : BASE_URL+"/get-user-details",
    UPDATE_USER_DETAILS: BASE_URL + "/update-user-details"
}

export const addedUserEndpoints = {
    GET_ALL_ADDED_USER : BASE_URL + "/get-all-added-user",
    ADD_USER : BASE_URL + "/add-user"
}