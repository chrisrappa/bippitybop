import showdown from 'showdown';
import ReactHTMLParser from 'react-html-parser';

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