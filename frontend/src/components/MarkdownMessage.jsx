//마크다운 채팅
import styled from "styled-components";
import React from "react";
import ReactMarkdown from "react-markdown";

const MarkdownContainer = styled.div`
  padding: 1vw;
  border-radius: 1vw;
  color: #fff;
  margin: 2vw;
  line-height: 1.8;
`;

const MarkdownMessage = ({ content }) => (
  <MarkdownContainer>
    <ReactMarkdown>{content}</ReactMarkdown>
  </MarkdownContainer>
);

export default MarkdownMessage;
