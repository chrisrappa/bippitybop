import { 
  applyMiddleware , 
  combineReducers , 
  compose         , 
  createStore
} from "redux";
import thunk from "redux-thunk";
import { userDataReducer } from "./reducers/userDataReducer" ;
import { gptChatReducer } from "./reducers/gptChatReducer";

const initialState = {
  userData: {
    loginInfo: {
      userCredits       : null,
      user_id           : null,
      uploadedFileIds   : []
    },
  },
  gptChat: {
    messages: [],
    gptVersion: '',
    trialMessageSaves: [],
    ownedDbMessages: [],
    externalDbMessages: [],
    dbMessagesLoading: false,
    dbMessagesFetchError: null,
    ownedFolders: [],
    externalFolders: []
  }
};

const reducers = combineReducers({
  userData              : userDataReducer     ,
  gptChat               : gptChatReducer      ,
});

const composeEnhancer = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true})) || compose;
const store = createStore(reducers, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;