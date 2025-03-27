import { 
  GPT_VERSION_CHANGE,
} from "../consts/gptChatConstants";

export const config = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export const updateGPTVersion = (newVersion) => (dispatch) => {
  dispatch({ type: GPT_VERSION_CHANGE, payload: newVersion});
};