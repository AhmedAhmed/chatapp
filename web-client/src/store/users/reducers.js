import {ADD_USER, DELETE_USER} from './types';

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            const id = state.length + 1;
            console.log(id);
            return [...state, {id,...action.payload}];
        case DELETE_USER:
            return [
                ...state,
                state.filter(user => user.id !== action.payload),
            ];
        default:
            return state;
    }
};

export default reducer;
