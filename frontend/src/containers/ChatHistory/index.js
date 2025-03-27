import React from 'react';
import { 
  ContainerParentGrid, 
  DocumentListGrid, 
  InnerGridBackgroundContainer
} from './styled';
import HistoryListItem from './HistoryListItem';

function ChatHistory() {

  const conversationHistory = localStorage.getItem('conversationHistory');
  const parsedConversationHistory = JSON.parse(conversationHistory);
  const sorted = parsedConversationHistory?.sort((a, b) => new Date(b?.dateTime) - new Date(a?.dateTime));

  return (
    <ContainerParentGrid>
      <DocumentListGrid container>
        <InnerGridBackgroundContainer>
          {
            sorted?.map((entry) => (
              <HistoryListItem
                dateTime={entry?.dateTime}
                key={entry?.dateTime}
                messages={entry?.messageThread} 
              />
            ))
          }
        </InnerGridBackgroundContainer>
      </DocumentListGrid>
    </ContainerParentGrid>
  )
};

export default ChatHistory;