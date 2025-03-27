import axios from 'axios';
import { 
  USER_INFO_SAVE_REQUEST,
  USER_INFO_SAVE_SUCCESS,
  USER_INFO_SAVE_FAIL,
  SUBTRACT_CREDITS_REQUEST,
  SUBTRACT_CREDITS_SUCCESS,
  SUBTRACT_CREDITS_FAIL,
  EDIT_USERNAME_EMAIL_REQUEST,
  EDIT_USERNAME_EMAIL_SUCCESS,
  EDIT_USERNAME_EMAIL_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
} from "../consts/userConstants";

export const config = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export const saveUserInfo = (userInfo) => async(dispatch) => {
  let stripeMembershipData;
  
  const url = `${process.env.REACT_APP_API_PATH}api/user/signin`;

  dispatch({type: USER_INFO_SAVE_REQUEST});

  const checkForNameAndEmail = () => {
    if(userInfo?.name === '' || !userInfo?.email){
      return { ...userInfo, name: null, email: null }; 
    };

    return userInfo;
  };

  try{

    const response = await axios.post(url, checkForNameAndEmail(), config);

    let isAdmin = false;

    if(response.status === 200){
      if(response?.data?.stripeSubscriptionId){
        const stripeMembershipUrl = `${process.env.REACT_APP_API_PATH}api/stripe/subscription/${response?.data?.stripeSubscriptionId}`;
        stripeMembershipData = await axios.get(stripeMembershipUrl, config);
      };

      if(response.data._id === "6671e19111acfc02a927b86c"){
        await axios.post(`${process.env.REACT_APP_API_PATH}api/user/makeAdmin`, {userId: response.data._id}, config)
        .then(() => isAdmin = true);
      };
      
      const userInfoForState = {
        ...userInfo,
        user_id: response?.data?._id,
        userCredits: response?.data?.userCredits,
        email: response?.data?.email,
        username: response?.data?.username,
      };

      dispatch({
        type: USER_INFO_SAVE_SUCCESS, 
        payload: userInfoForState
      });

    };

  } catch(err) {

    dispatch({type: USER_INFO_SAVE_FAIL, payload: err.message});

  };
};

export const editUsernameEmail = ({userId, username, email}) => async(dispatch) => {

  dispatch({type: EDIT_USERNAME_EMAIL_REQUEST });
  const url = `${process.env.REACT_APP_API_PATH}api/user/updateBasicInfo`;

  try {
    const response = await axios.post(
      url, 
      { username: username, email: email, userId: userId}, 
      config
    );

    if(response.status === 200){
      dispatch({ type: EDIT_USERNAME_EMAIL_SUCCESS, payload: { username: username, email: email} });
    };
  } catch(error) {
    dispatch({ type: EDIT_USERNAME_EMAIL_FAIL, payload: error?.message});
  }
};


export const subtractCreditsFromUser = (userId, AIModel) => async(dispatch) => {

  const path = `${process.env.REACT_APP_API_PATH}api/user/subtractCredits`;

  dispatch({ type: SUBTRACT_CREDITS_REQUEST });

  const creditSubtractionAmount = () => {
    switch(AIModel){
      case 'ChatGPT 4o':
        return 1;
      case 'Claude':
        return 2;
      case 'Grok xAI':
        return 2;
      case 'Perplexity':
        return 45;
      default: return 1;
    }
  }

  try{

    const response = await axios.post(path, {userId: userId, AIModel: AIModel}, config);
    
    if(response?.status === 200){
      dispatch({ type: SUBTRACT_CREDITS_SUCCESS, payload: { subtractAmount: creditSubtractionAmount()} });
    };

  } catch (error) {
    dispatch({ type: SUBTRACT_CREDITS_FAIL, payload: error.message});
  };
};

export const deleteUser = (userId) => async(dispatch) => {

  const url = `${process.env.REACT_APP_API_PATH}api/user/${userId}`;
  dispatch({ type: USER_DELETE_REQUEST });

  try{
    const response = await axios.delete(url, config);

    if(response.status === 200){
      dispatch({ type: USER_DELETE_SUCCESS });
    };

  } catch (error){
    dispatch({ type: USER_INFO_SAVE_FAIL });
  }
};