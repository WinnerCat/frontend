import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Modal from './adoptmodal';
import MarkdownMessage from './MarkdownMessage';
import SearchIcon from "../img/search_icon.png";
import { BeatLoader } from 'react-spinners';
import { useNavigate } from "react-router-dom";

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  max-width: 1200px;
  margin: 0 auto;
`;

const ChatContainer = styled.div`
  width: 100%;
  max-height: 65vh;
  overflow-y: auto;
  padding: 2vw;
  display: flex;
  flex-direction: column;
`;

const SearchBarContainer = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 2vw;
  padding: 0.3vw 2vw;
  position: relative;
  margin-top: 2vw;
`;

const SearchInput = styled.input`
  border: none;
  flex: 1;
  padding: 0.5vw;
  border-radius: 16px;
  outline: none;
  font-size: 1vw;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5vw;
  img {
    width: 1.5vw;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: ${props => (props.direction === 'row' ? 'row' : 'row-reverse')};
  align-items: flex-start;
  font-size: 1vw;
  max-width: 100%;
`;

const QuestionBox = styled.div`
  max-width: 70%;
  padding: 0.5vw 1vw;
  border-radius: 10px;
  background-color: #e8f0ff;
  color: #000000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  line-height: 1.8;
  margin-top: 2vw;
`;

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

const AnswerBox = styled.div`
  border-radius: 1vw;
  background-color: #6630ff;
  color: #ffffff;
  box-shadow: none;
  position: relative;
  margin-top: 2vw;
  line-height: 1.8;
`;

const LoadingMessage = styled.div`
  border-radius: 1vw;
  background-color: #6630ff;
  box-shadow: none;
  position: relative;
  margin-top: 1vw;
  padding: 1vw;
  line-height: 1.8;
  text-align: center;
`;

const AdditionalText = styled.p`
  font-size: 0.9vw;
  text-align: center;
  border: none;
  text-decoration: underline;
  color: #808080;
  position: relative;
  cursor: pointer;
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

const ConversationDetail = ({ title, articleId, close }) => {
 const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const chatContainerRef = useRef(null); // ref 추가

  useEffect(() => {
    console.log("컴포넌트가 마운트되었습니다.");

    const savedData = localStorage.getItem('conversationData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        const messages = [];

        // 질문과 답변을 구분하여 배열에 추가
        parsedData.questionList.forEach((question, index) => {
          messages.push({ text: question, isUser: false });
          if (index < parsedData.answerList.length) {
            messages.push({
              text: parsedData.answerList[index].content,
              isUser: true,
            });
          }
        });

        setChatMessages(messages);
        console.log("대화 데이터를 불러왔습니다:", messages);
      } catch (error) {
        console.error("로컬 스토리지에서 대화 데이터를 파싱하는 데 실패했습니다:", error);
      }
    }

    return () => {
      console.log("컴포넌트가 언마운트되었습니다.");
    };
  }, [title]);

  useEffect(() => {
    // chatContainerRef가 설정된 후, 자동 스크롤을 하도록 설정
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleAcceptClick = (message) => {
    console.log("답변 채택 클릭:", message);
    setSelectedMessage(message);
    setModalOpen(true);
  };

  const handleConfirm = () => {
    console.log("답변 채택됨:", selectedMessage);
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    console.log("모달 닫힘");
    setModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    if (!token) {
      alert("토큰이 없습니다. 로그인을 해주세요.");
      console.log("토큰이 없습니다. 로그인을 해주세요.");
      return;
    }
  
    const questionRoomId = localStorage.getItem("questionRoomId"); // 기본값 설정
  
    const requestData = {
      questionRoomId,
      question: searchQuery
    };
  
    // UI에 질문 추가
    setChatMessages([...chatMessages, { text: searchQuery, isUser: false }]);
    // 검색어 초기화
    setSearchQuery("");
    // 로딩 상태 활성화
    setIsLoading(true);

    try {
      console.log("질문 요청 데이터:", requestData);
  
      const response = await fetch("https://bugnyang.shop/api/question", {
        method: "POST",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });
  
      const data = await response.json();
      console.log("질문 POST 응답:", data);
  
      // 데이터 구조에 맞춰 조건문 수정
      if (data.isSuccess && data.result && data.result.answer) {
        console.log("질문이 성공적으로 전송되었습니다.");
  
        // 로컬 스토리지 업데이트
        const savedData = localStorage.getItem('conversationData');
        let updatedData = { questionList: [], answerList: [] };
        if (savedData) {
          updatedData = JSON.parse(savedData);
        }
        updatedData.questionList.push(searchQuery);
        updatedData.answerList.push({ content: data.result.answer });
        localStorage.setItem('conversationData', JSON.stringify(updatedData));
  
        // UI에 답변 추가
        setChatMessages([...chatMessages, { text: searchQuery, isUser: false }, { text: data.result.answer, isUser: true }]);
      } else {
        alert("질문 전송에 실패했습니다. 다시 시도해주세요.");
        console.log("질문 전송에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("질문 제출 중 오류 발생:", error);
      alert("질문 전송 중 오류가 발생했습니다.");
    } finally {
      // 로딩 상태 해제
      setIsLoading(false);
    }
  };

  const handleAdditionalTextClick = () => {
    console.log("추가 텍스트 클릭됨");
    navigate("/postCreate");
  };

  return (
    <DetailContainer>
      <h1 style={{ fontSize: '2vw' }}>{title}</h1>
      <ChatContainer ref={chatContainerRef}>
        {chatMessages.map((message, index) => (
          message.isUser ? 
            <AnswerMessage key={index} text={message.text} onAccept={() => handleAcceptClick(message)} /> : 
            <QuestionMessage key={index} text={message.text} />
        ))}
        {isLoading && (
          <LoadingMessage>
            <BeatLoader color='#ffffff' />
          </LoadingMessage>
        )}
      </ChatContainer>
      <SearchBarContainer onSubmit={handleSearchSubmit}>
        <SearchInput
          type="text"
          placeholder="어떤 에러가 발생 하였나요?"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <SearchButton type="submit">
          <img src={SearchIcon} alt="Search" />
        </SearchButton>
        
      </SearchBarContainer>
      <AdditionalText onClick={handleAdditionalTextClick}>
            답변 외 방법으로 해결하였습니다.
        </AdditionalText>
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
