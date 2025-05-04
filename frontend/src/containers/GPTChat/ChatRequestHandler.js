import React from 'react';

async function ChatRequestHandler({
  updatedMessages, 
  selectedVersion, 
  setMessages,
  setStopGenerating,
  setResponseLoading,
  stopGenerating,
}) {

  const preferredModel = selectedVersion?.preferredModel ?? 'openai';

  const saveMessagesToLocalStorage = (messages, maxMessages = 10) => {
    if (messages.length > maxMessages) {
      messages = messages.slice(-maxMessages);
    };

    localStorage.setItem('messageHistory', JSON.stringify(messages));
  };

  const response = await fetch(
    `${process.env.REACT_APP_API_PATH}api/${preferredModel}`, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 

      body: JSON.stringify({ 
        messages: updatedMessages,
        systemMessage: selectedVersion?.system
      }),
    }
  );

  if (!response.body) {
    throw new Error('ReadableStream not supported in this browser.');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let result = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done || stopGenerating) {
      setStopGenerating(false);
      setResponseLoading(false);
      break;
    };

    result += decoder.decode(value);

    // eslint-disable-next-line
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      let updatedMessages;

      if (lastMessage && lastMessage.role === 'assistant') {
        lastMessage.content = result;
        updatedMessages = [...prevMessages.slice(0, -1), lastMessage];
      } else {
        updatedMessages = [...prevMessages, { role: 'assistant', content: result }];
      }

      // Save the updated messages to local storage, keeping only the last 10
      saveMessagesToLocalStorage(updatedMessages);

      return updatedMessages;
    });
  };
}

export default ChatRequestHandler;