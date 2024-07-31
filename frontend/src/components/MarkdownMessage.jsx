//마크다운 채팅
import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const MarkdownContainer = styled.div`
  max-width: 70%;
  padding: 1vw;
  border-radius: 10px;
  //background-color: #e8f0ff;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 1vw;
  line-height: 1.8;
`;

const MarkdownMessage = ({ content }) => (
  <MarkdownContainer>
    <ReactMarkdown>{content}</ReactMarkdown>
  </MarkdownContainer>
);

export default MarkdownMessage;