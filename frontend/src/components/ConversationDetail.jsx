import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Modal from './adoptmodal';
import MarkdownMessage from './MarkdownMessage';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  max-width: 1200px;
  margin: 0 auto;
`;

// 채팅
const ChatContainer = styled.div`
  width: 100%;
  max-height: 65vh;
  overflow-y: auto;
  padding: 1vw;
  display: flex;
  flex-direction: column;
`;

// 메시지 컨테이너
const MessageContainer = styled.div`
  display: flex;
  flex-direction: ${props => (props.direction === 'row' ? 'row' : 'row-reverse')};
  align-items: flex-start;
  font-size: 1vw;
  max-width: 100%;
`;

// 질문 메시지
const QuestionBox = styled.div`
  max-width: 70%;
  padding: 0.5vw 1vw;
  border-radius: 10px;
  background-color: #e8f0ff;
  color: #000000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  line-height: 1.8;
  
  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    bottom: 1vw;
    border: 10px solid transparent;
    right: -20px;
    border-left-color: #e8f0ff;
  }
`;

// 답변 채택 버튼
const AcceptButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 0.5vw 1.5vw;
  color: white;
  background-color: #6630ff;
  border: 0.1vw solid #ffffff;
  border-radius: 0.8vw;
  cursor: pointer;
  font-size: 1vw;

  &:hover {
    background-color: #808080;
  }
`;

// 답변 메시지
const AnswerBox = styled.div`
  //max-width: 70%;
  border-radius: 1vw;
  background-color: #6630ff;
  color: #ffffff;
  box-shadow: none;
  position: relative;
  margin-top: 1vw;
  line-height: 1.8;
  
  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    bottom: 1.5vw;
    border: 10px solid transparent;
    left: -20px;
    border-right-color: #6630ff;
  }
`;

const QuestionMessage = ({ text }) => (
  <MessageContainer direction="row-reverse">
    <QuestionBox>
      {text}
    </QuestionBox>
  </MessageContainer>
);

const AnswerMessage = ({ text, onAccept }) => (
  <MessageContainer direction="row">
    <AnswerBox>
      <MarkdownMessage content={text} />
      <AcceptButton onClick={onAccept}>답변채택</AcceptButton>
    </AnswerBox>
  </MessageContainer>
);

const ConversationDetail = ({ title, content, articleId, close }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem('conversationData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        const messages = [];
        if (parsedData.question) {
          messages.push({ text: parsedData.question.content, isUser: false });
        }
        if (parsedData.answers) {
          messages.push(...parsedData.answers.map(answer => ({
            text: answer.content,
            isUser: true,
          })));
        }
        setChatMessages(messages);
      } catch (error) {
        console.error("Failed to parse conversation data from localStorage", error);
      }
    }
  }, [title, content]);

  const handleAcceptClick = (message) => {
    setSelectedMessage(message);
    setModalOpen(true);
  };

  const handleConfirm = () => {
    console.log("답변 채택됨:", selectedMessage);
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <DetailContainer>
      <h1>{title}</h1>
      <ChatContainer>
        {chatMessages.map((message, index) => (
          message.isUser ? 
            <AnswerMessage key={index} text={message.text} onAccept={() => handleAcceptClick(message)} /> : 
            <QuestionMessage key={index} text={message.text} />
        ))}
      </ChatContainer>
      {isModalOpen && (
        <Modal
          message="답변을 채택할까요?"
          description="버그냥이 덕분에 골치 아픈 버그를 해결했어요!"
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
          articleId={articleId}
        />
      )}
    </DetailContainer>
  );
};

export default ConversationDetail;
