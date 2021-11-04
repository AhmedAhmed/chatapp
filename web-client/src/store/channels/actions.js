import {CREATE_CHANNEL, DELETE_CHANNEL, ADD_MESSAGE, CLEAR_MESSAGES} from './types';

export const createChannel = channel => {
    return {
        type: CREATE_CHANNEL,
        payload: channel
    };
}

export const deleteChannel = channelId => {
    return {
        type: DELETE_CHANNEL,
        payload: channelId
    };
}

export const createMessage = (channelId, user, message) => {
    return {
      type: ADD_MESSAGE,
      payload: {
          message,
          channelId,
          user,
      }
    }
  }
  
export const clearMessages = () => {
    return {
        type: CLEAR_MESSAGES,
    }
}