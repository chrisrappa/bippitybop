import { 
  CLEAR_GLOBAL_MESSAGES,
  GPT_VERSION_CHANGE, 
  MESSAGES_COLLECTION_SAVE_SUCCESS
} from "../consts/gptChatConstants";

export const gptChatReducer = (state = {}, action) => {

  switch(action.type){
    case MESSAGES_COLLECTION_SAVE_SUCCESS: 
      return { 
        ...state,
        messages: action.payload 
      };
    case GPT_VERSION_CHANGE:
      return {
        ...state,
        gptVersion: action.payload
      };
    case CLEAR_GLOBAL_MESSAGES:   
      return {
        ...state,
        messages: []
      };
    default: return {
      ...state
    };
  };
};