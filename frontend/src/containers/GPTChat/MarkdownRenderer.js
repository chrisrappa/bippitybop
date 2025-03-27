// MarkdownRenderer.js
import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeBlockContainer } from './styled';
import ReactHTMLParser from 'react-html-parser';
import rehypeRaw from 'rehype-raw';
import { useMediaQuery } from '@mui/material';
import remarkGfm from 'remark-gfm';

const MarkdownRenderer = ({ content }) => {

  // Sometimes this defaults text to bold

	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  
  const handleToHTML = (data) => {
    // First, convert the markdown table to HTML table
    const convertMarkdownTableToHTML = (markdown) => {
      const lines = markdown.trim().split('\n');
      if (lines.length < 2) return markdown;

      // Check if it's a table (has separator row)
      const hasTableSeparator = lines.some(line => 
        line.trim().startsWith('|') && 
        line.trim().endsWith('|') && 
        line.includes('|-')
      );

      if (!hasTableSeparator) return markdown;

      // Convert to HTML table
      let html = '<table style="border-collapse: collapse; width: 100%; margin: 1rem 0;">';
      
      lines.forEach((line, index) => {
        const cells = line.trim().split('|').filter(Boolean);
        
        if (cells.length) {
          html += '<tr>';
          cells.forEach(cell => {
            // Skip separator row
            if (cell.trim().match(/^[-:]+$/)) return;
            
            const tag = index === 0 ? 'th' : 'td';
            html += `<${tag} style="border: 1px solid #ddd; padding: 8px; ${index === 0 ? 'background-color: #f4f4f4;' : ''}">${cell.trim()}</${tag}>`;
          });
          html += '</tr>';
        }
      });
      
      html += '</table>';
      return html;
    };

    // Check if the content contains a markdown table
    if (data?.includes('|') && data?.includes('\n')) {
      data = convertMarkdownTableToHTML(data);
    }

    return ReactHTMLParser(data);
  };

  useEffect(() => {
    // Load Prism.js dynamically for highlighting
    import('prismjs/themes/prism-okaidia.css');
  }, []);
  

  const codeBlockStyle = {
    fontSize: '14px', 
    lineHeight: '1.5',
    width: '100%',
    maxWidth: isMobile ? '80dvw' : '70dvw',
    margin: '0',
  };

  const tableStyles = {
    table: {
      borderCollapse: 'collapse',
      width: '100%',
      margin: '1rem 0',
    },
    th: {
      border: '1px solid #ddd',
      padding: '8px',
      backgroundColor: '#f4f4f4',
    },
    td: {
      border: '1px solid #ddd',
      padding: '8px',
    },
    left: {
      textAlign: 'left',
    },
    center: {
      textAlign: 'center',
    },
    right: {
      textAlign: 'right',
    }
  };

  return (
    <ReactMarkdown
      children={content}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');

          return (!inline && match) ? (
            <CodeBlockContainer container>
              <SyntaxHighlighter
                style={okaidia}
                language={match[1]}
                PreTag="div"
                {...props}
                customStyle={codeBlockStyle}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </CodeBlockContainer>
          ) : (
            <code>
              {handleToHTML(children)}
            </code>
          );
        },
        table: ({node, ...props}) => (
          <table style={tableStyles.table} {...props} />
        ),
        th: ({node, style, align, ...props}) => (
          <th 
            style={{
              ...tableStyles.th,
              ...(align === 'left' && tableStyles.left),
              ...(align === 'center' && tableStyles.center),
              ...(align === 'right' && tableStyles.right),
            }} 
            {...props}
          />
        ),
        td: ({node, style, align, ...props}) => (
          <td 
            style={{
              ...tableStyles.td,
              ...(align === 'left' && tableStyles.left),
              ...(align === 'center' && tableStyles.center),
              ...(align === 'right' && tableStyles.right),
            }} 
            {...props}
          />
        ),
      }}
    />
  );
};

export default MarkdownRenderer;