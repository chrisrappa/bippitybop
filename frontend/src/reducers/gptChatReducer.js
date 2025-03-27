import { 
  DELETE_CHAT_REQUEST, 
  DELETE_CHAT_SUCCESS, 
  REMOVE_COLLABORATOR_SUCCESS, 
  REMOVE_INVITE_SUCCESS, 
  SEND_CHAT_REQUEST,
  SEND_CHAT_SUCCESS, 
  SEND_FOLDER_COLLAB_INVITE_SUCCESS, 
  UPDATE_COLLABORATORS_SUCCESS 
} from "../consts/collaboratorsConstants";
import { 
  CREATE_FOLDER_FAIL,
  CREATE_FOLDER_REQUEST,
  CREATE_FOLDER_SUCCESS,
  DOC_FOLDER_UPDATE_FAIL,
  DOC_FOLDER_UPDATE_REQUEST,
  DOC_FOLDER_UPDATE_SUCCESS,
  GET_USER_FOLDERS_FAIL, 
  GET_USER_FOLDERS_REQUEST, 
  GET_USER_FOLDERS_SUCCESS 
} from "../consts/docmentConstants";
import { 
  CLEAR_GLOBAL_MESSAGES, 
  DELETE_GPT_FOLDER_FAIL, 
  DELETE_GPT_FOLDER_REQUEST, 
  DELETE_GPT_FOLDER_SUCCESS, 
  DELETE_GPT_MESSAGE_FAIL, 
  DELETE_GPT_MESSAGE_REQUEST, 
  DELETE_GPT_MESSAGE_SUCCESS, 
  GET_DB_MESSAGES_FAIL, 
  GET_DB_MESSAGES_REQUEST, 
  GET_DB_MESSAGES_SUCCESS, 
  GPT_VERSION_CHANGE, 
  MESSAGES_COLLECTION_SAVE_SUCCESS, 
  SAVE_GPT_MESSAGE_FAIL, 
  SAVE_GPT_MESSAGE_REQUEST, 
  SAVE_GPT_MESSAGE_SUCCESS, 
  SAVE_TRIAL_GPT_MESSAGE_SUCCESS, 
  SEND_COLLAB_INVITE_SUCCESS, 
  UPDATE_DOCUMENT_FAIL, 
  UPDATE_DOCUMENT_REQUEST, 
  UPDATE_DOCUMENT_SUCCESS, 
  UPDATE_FOLDER_NAME_SUCCESS, 
  UPDATE_TRIAL_GPT_MESSAGE_SUCCESS 
} from "../consts/gptChatConstants";
import updateNameInFolders from "../helpers/updateNameInFolders";


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
    case SAVE_TRIAL_GPT_MESSAGE_SUCCESS:
      return{
        ...state,
        trialMessageSaves: [
          ...state.trialMessageSaves,
          action.payload
        ]
      };
    case UPDATE_TRIAL_GPT_MESSAGE_SUCCESS:
      return{
        ...state,
        trialMessageSaves: state.trialMessageSaves.map(message =>
          message._id === action.payload._id ? action.payload : message
        )
      };
    case CLEAR_GLOBAL_MESSAGES:   
      return {
        ...state,
        messages: []
      };
    case GET_DB_MESSAGES_REQUEST: 
      return {
        ...state,
        dbMessagesLoading: true,
        dbMessagesFetchError: null
      };
    case GET_DB_MESSAGES_SUCCESS:
      return {
        ...state,
        ownedDbMessages: action.payload.ownedMessages ?? [],
        externalDbMessages: action.payload.externalMessages ?? [],
        dbMessagesLoading: false
      };
    case GET_DB_MESSAGES_FAIL:
      return {
        ...state,
        dbMessagesLoading: false,
        dbMessagesFetchError: action.payload
      };
    case CREATE_FOLDER_REQUEST:
      return {
        ...state,
        folderCreateLoading: true
      };
    case CREATE_FOLDER_SUCCESS:
      return {
        ...state,
        folderCreateLoading: false,
        ownedFolders: [...state.ownedFolders, action.payload],
        latestCreatedFolder: action.payload
      };
    case CREATE_FOLDER_FAIL:
      return {
        ...state,
        folderCreateLoading: false,
        folderCreateError: action.payload
      };
    case GET_USER_FOLDERS_REQUEST: 
      return {
        ...state,
        userFoldersLoading: true
      };
    case GET_USER_FOLDERS_SUCCESS:
      return {
        ...state,
        userFoldersLoading: false,
        ownedFolders: action.payload.ownedFolders,
        externalFolders: action.payload.externalFolders
      };
    case GET_USER_FOLDERS_FAIL:
      return {
        ...state,
        userFoldersLoading: false,
        userFoldersError: action.payload.error
      }
    case UPDATE_FOLDER_NAME_SUCCESS:
      const { folderId, folderName } = action.payload;

      const updatedOwnedFolders = updateNameInFolders(
        state.ownedFolders, 
        folderName,
        folderId
      );

      const updatedExternalFolders = updateNameInFolders(
        state.externalFolders, 
        folderName,
        folderId
      );

      const foundInOwned = state.ownedFolders.some(
        folder => folder._id === folderId
      );

      return {
        ...state,
        ownedFolders: foundInOwned ? updatedOwnedFolders : state.ownedFolders,
        externalFolders: foundInOwned ? state.externalFolders : updatedExternalFolders,
      };
    case UPDATE_COLLABORATORS_SUCCESS:
      return {
        ...state,
        ownedDbMessages: state.ownedDbMessages?.map(message =>
          message._id === action.payload.messageId ? 
          { ...message, sharedWith: action.payload.sharedWith } : 
          message
        )
      };
    case SEND_FOLDER_COLLAB_INVITE_SUCCESS:
      return {
        ...state,
        ownedFolders: state.ownedFolders?.map(folder =>
          folder._id === action.payload._id ? 
          { ...folder, invites: action.payload.invites } : 
          folder
        )
      };
    case REMOVE_COLLABORATOR_SUCCESS:
      return {
        ...state,
        ownedDbMessages: state.ownedDbMessages?.map(message =>
          message._id === action.payload.messageId ? 
          { ...message, sharedWith: action.payload.sharedWith } : 
          message
        )
      };
    case SEND_COLLAB_INVITE_SUCCESS:
      return {
        ...state,
        ownedDbMessages: state.ownedDbMessages.map(message => 
          message._id === action.payload._id ? action.payload : message
        )
      };
    case REMOVE_INVITE_SUCCESS: 
      return {
        ...state,
        ownedDbMessages: state.ownedDbMessages?.map(message =>
          message._id === action.payload.updatedMessage._id 
            ? { ...message, invites: action.payload.updatedMessage.invites } 
            : message
        )
      };
    case SAVE_GPT_MESSAGE_REQUEST:
      return {
        ...state,
        savingGptMessage: true
      };
    case SAVE_GPT_MESSAGE_SUCCESS:
      return {
        ...state,
        savingGptMessage: false,
        ownedDbMessages: [...state.ownedDbMessages, action.payload]
      };
    case SAVE_GPT_MESSAGE_FAIL:
      return {
        ...state,
        savingGptMessage: false,
        gptMessageSaveError: action.payload.error
      };
    case DELETE_GPT_MESSAGE_REQUEST:
      return {
        ...state,
        deleteMessageLoading: true
      };
    case DELETE_GPT_MESSAGE_SUCCESS:
      return {
        ...state,
        ownedDbMessages: state.ownedDbMessages?.filter(message => message._id !== action.payload.messageId),
        deleteMessageLoading: false
      };
    case DELETE_GPT_MESSAGE_FAIL:
      return {
        ...state,
        deleteMessageError: action.payload.error,
        deleteMessageLoading: false
      };
    case DELETE_GPT_FOLDER_REQUEST:
      return {
        ...state,
        deleteFolderLoading: true
      };
    case DELETE_GPT_FOLDER_SUCCESS:
      return {
        ...state,
        ownedDbMessages: state.ownedDbMessages?.filter(
          message => message.folderId !== action.payload.folderId
        ),
        ownedFolders: state.ownedFolders?.filter(
          folder => folder._id !== action.payload.folderId
        ),
        deleteFolderLoading: false
      };
    case DELETE_GPT_FOLDER_FAIL:
      return {
        ...state,
        deleteFolderError: action.payload.error,
        deleteFolderLoading: false
      };
    case UPDATE_DOCUMENT_REQUEST:
      return {
        ...state,
        updatingDocument: true,
        updateDocumentError: {}
      };
    case UPDATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        ownedDbMessages: state.ownedDbMessages.map(message =>
          message._id === action.payload._id ? action.payload : message
        ),
        updatingMessage: false
      };
    case DOC_FOLDER_UPDATE_SUCCESS:
      const updatedMessages = state.ownedDbMessages.map(message => {
        const updatedMessage = action.payload.find(updatedMsg => updatedMsg._id === message._id);
        return updatedMessage ? updatedMessage : message;
      });
      
      return {
        ...state,
        ownedDbMessages: updatedMessages,
        updatingFolder: false
      };
    case DOC_FOLDER_UPDATE_REQUEST:
      return {
        ...state,
        updatingFolder: true
      };
    case DOC_FOLDER_UPDATE_FAIL:
      return {
        ...state,
        updatingFolder: false,
        updateFolderError: action.payload.error
      };
    case UPDATE_DOCUMENT_FAIL:
      return {
        updatingDocument: false,
        updateDocumentError: action.payload.error
      };
    case SEND_CHAT_REQUEST:
      return {
        ...state,
        collabChatUpdating: true
      };
    case SEND_CHAT_SUCCESS:

      const updatedMessage = action.payload;

      const updateMessages = (messages) => (
        messages?.map(msg =>
          msg._id === updatedMessage._id ? updatedMessage : msg
        )
      );

      return {
        ...state,
        ownedDbMessages: updateMessages(state.ownedDbMessages),
        externalDbMessages: updateMessages(state.externalDbMessages),
        collabChatUpdating: false
      };
    case DELETE_CHAT_REQUEST: {
      return {
        ...state,
        chatDeleting: true,
        deletingChatId: action.payload
      }
    }

    case DELETE_CHAT_SUCCESS: {

      const { documentId, chatId } = action.payload;

      const removeChatFromMessages = (messages) => {
        return messages.map(doc => {
          if (doc._id === documentId) {
            return {
              ...doc,
              collabChats: doc.collabChats.filter(chat => chat._id !== chatId)
            };
          };

          return doc;
        });
      };

      return {
        ...state,
        ownedDbMessages: removeChatFromMessages(state.ownedDbMessages),
        externalDbMessages: removeChatFromMessages(state.externalDbMessages),
        chatDeleting: false,
        deletingChatId: null
      };
    };
    default: return {
      ...state
    };
  };
};