import React, { useState } from 'react'
import SaveToFolderModule from './SaveToFolderModule';
import AddNewFolderModule from './AddNewFolderModule';
import { useSelector } from 'react-redux';

function SavePopout({ 
  addNewFolder,
  handleClose,
  setAddNewFolder,
  setSelectedFolder,
  selectedFolder,
  handleSaveDoc,
  handleChange
}) {

  const userFolders = useSelector((state) => state.gptChat?.ownedFolders);
  const createFolderLoading = useSelector((state) => state.gptChat?.folderCreateLoading);

  const [selectedDocName, setSelectedDocName] = useState(null);

  const RenderPopout = () => {
    if(addNewFolder){
      return (
        <AddNewFolderModule 
          userFolders={userFolders}
          setAddNewFolder={setAddNewFolder}
        />
      )
    } else {
      return (
        <SaveToFolderModule 
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
          handleSaveDoc={handleSaveDoc}
          handleClose={handleClose}
          handleChange={handleChange}
          userFolders={userFolders}
          setAddNewFolder={setAddNewFolder}
          selectedDocName={selectedDocName}
          setSelectedDocName={setSelectedDocName}
          createFolderLoading={createFolderLoading}
        />
      )
    }
  }

  return RenderPopout();
}

export default SavePopout;