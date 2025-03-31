import {
  USER_INFO_SAVE_SUCCESS,
  SUBTRACT_CREDITS_SUCCESS,
  EDIT_USERNAME_EMAIL_REQUEST,
  EDIT_USERNAME_EMAIL_SUCCESS,
  EDIT_USERNAME_EMAIL_FAIL,
  USER_DELETE_SUCCESS,
} from "../consts/userConstants";

export const userDataReducer = (state = {}, action) => {
  
  switch(action.type){
    case SUBTRACT_CREDITS_SUCCESS:
      return {
        ...state,
        loginInfo: {
          ...state?.loginInfo,
          userCredits: state?.loginInfo?.userCredits - action.payload.subtractAmount
        }
      };
    case EDIT_USERNAME_EMAIL_REQUEST:
      return {
        ...state,
        loginInfo: {
          ...state?.loginInfo,
          basicInfoUpdating: true 
        }
      }
    case EDIT_USERNAME_EMAIL_SUCCESS:
      return {
        ...state,
        loginInfo: {
          ...state?.loginInfo,
          username: action.payload.username,
          email: action.payload.email,
          basicInfoUpdating: false
        }
      };
    case EDIT_USERNAME_EMAIL_FAIL:
      return {
        ...state,
        loginInfo: {
          ...state?.loginInfo,
          basicInfoError: action.payload,
          basicInfoUpdating: false
        }
      }
    case USER_INFO_SAVE_SUCCESS: 
      return {
        ...state,
        loginInfo: action.payload
      };
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        userProfileDeleted: true,
        loginInfo: {}
      }
    default: return {
      ...state
    };
  };
};