import showdown from 'showdown';
import ReactHTMLParser from 'react-html-parser';

const saveMessagesToLocalStorage = (messages, maxMessages = 10) => {
  if (messages.length > maxMessages) {
    messages = messages.slice(-maxMessages);
  };

  localStorage.setItem('messageHistory', JSON.stringify(messages));
};

export const createOpenAIRequest = async(
  updatedMessages, 
  selectedVersion, 
  setMessages,
  setStopGenerating,
  setResponseLoading,
  stopGenerating,
) => {

  const response = await fetch(
    `${process.env.REACT_APP_API_PATH}api/openai`, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      // Here you need to send the entire chat log for context of inputs
      body: JSON.stringify({ 
        messages: updatedMessages, 
        selectedVersion: selectedVersion, 
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
};

export const createGrokRequest = async(
  updatedMessages, 
  setMessages,
  setStopGenerating,
  setResponseLoading,
  stopGenerating
) => {

  const response = await fetch(
    `${process.env.REACT_APP_API_PATH}api/grok`, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      // Here you need to send the entire chat log for context of inputs
      body: JSON.stringify({ messages: updatedMessages }),
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
};

export const createClaudeSonnetRequest = async(
  updatedMessages, 
  setMessages,
  setStopGenerating,
  setResponseLoading,
  stopGenerating
) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_PATH}api/claude`, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      // Here you need to send the entire chat log for context of inputs
      body: JSON.stringify({ messages: updatedMessages }),
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
};

export const createPerplexityRequest = async(
  updatedMessages, 
  setMessages,
  setStopGenerating,
  setResponseLoading,
  stopGenerating
) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_PATH}api/perplexity`, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      // Here you need to send the entire chat log for context of inputs
      body: JSON.stringify({ messages: updatedMessages }),
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
};

export const handleKeyDown = (
  event,
  setInput,
  setTimeout,
  handleSend,
  responseLoading
) => {
  if (event.key === 'Enter' && event.shiftKey) {
    event.preventDefault();
    const { selectionStart, selectionEnd, value } = event.target;
    const newValue =
      value.substring(0, selectionStart) + '\n' + value.substring(selectionEnd);
    setInput(newValue);
    // Adjust cursor position to after the newline
    setTimeout(() => {
      event.target.selectionStart = selectionStart + 1;
      event.target.selectionEnd = selectionStart + 1;
    }, 0);
  };

  if (event.key === 'Enter' && !event.shiftKey && !responseLoading) {

    event.preventDefault(); 
    handleSend(event.target.value);
    setInput('');
  };
};

export const handleToHTML = (data) => {
  const converter = new showdown.Converter();
  // Wrap code containing 'refs' in a code block to prevent parsing issues
  const codeWithRefs = data?.replace(/(\b(?:ref)\s*=\s*{.*?})/g, '<code>$1</code>');
  
  const html = converter.makeHtml(codeWithRefs);
  return ReactHTMLParser(html);
};