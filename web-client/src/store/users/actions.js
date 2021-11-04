import { ADD_USER, DELETE_USER } from "./types";

export const createUser = (user) => {
    return {
        type: ADD_USER,
        payload: user,
    };
};

export const deleteUser = id => {
    return {
        type: DELETE_USER,
        payload: id,
    };
}
