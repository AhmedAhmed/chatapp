import {CREATE_CHANNEL, DELETE_CHANNEL, ADD_MESSAGE, CLEAR_MESSAGES} from './types';

const initialState = [{
    id: 1,
    name: 'general',
    messages: [],
}];

const reducer = (state = initialState, action) => {
    let messageIndex = 0;
    console.log(action);
    switch (action.type) {
        case CREATE_CHANNEL:
            return [
                ...state,
                {
                    id: state.length + 1,
                    ...action.payload,
                    messages: [],
                }
            ];
        case DELETE_CHANNEL:
            return [
                ...state,
                ...state.channels.filter(channel => channel.id !== action.payload),
            ];
        case ADD_MESSAGE:
            messageIndex = state.findIndex((channel) => channel.id === action.payload.channelId);
            const message = {
                user: action.payload.user,
                text: action.payload.message,
            };
            return Object.assign(
                [], state, {
                    [messageIndex]: {
                        ...state[messageIndex],
                        messages: [
                            ...state[messageIndex].messages,
                            message
                        ]
                    }
                });
        case CLEAR_MESSAGES:
            messageIndex = state.findIndex((channel) => channel.id === action.payload.channelId);
            return [
                ...state,
                state[messageIndex].messages = [],
            ];
        default:
            return state;
    }
}

export default reducer;
