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
  max-width: 120vw;
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
  border: 0.1vw solid #ccc;
  border-radius: 2vw;
  padding: 0.5vw 2vw;
  position: relative;
  margin-top: 2vw;
`;

const SearchInput = styled.input`
  border: none;
  flex: 1;
  padding: 0.5vw;
  border-radius: 1.5vw;
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
  border-radius: 1vw;
  background-color: #e8f0ff;
  color: #000000;
  box-shadow: 0 0.2vw 0.4vw rgba(0, 0, 0, 0.1);
  position: relative;
  line-height: 1.8;
  margin-top: 2vw;
`;

const AcceptButton = styled.button`
  position: absolute;
  right: 1vw;
  bottom: 1vw;
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
   width: 80%;
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
  width: 30%;
`;

const AdditionalText = styled.p`
  font-size: 0.9vw;
  text-align: center;
  border: none;
  text-decoration: underline;
  text-decoration-color: #d9d9d9;
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
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({ id: null, question: '', answer: '' }); // 추가된 상태 변수
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 대화 데이터 로드
    const savedData = localStorage.getItem('conversationData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        const messages = [];

        parsedData.questionList.forEach((question, index) => {
          messages.push({ text: question, isUser: false });
          if (index < parsedData.answerList.length) {
            messages.push({
              text: parsedData.answerList[index].content,
              isUser: true,
              id: parsedData.answerList[index].id // 답변 ID 추가
            });
          }
        });

        setChatMessages(messages);
      } catch (error) {
        console.error("로컬 스토리지에서 대화 데이터를 파싱하는 데 실패했습니다:", error);
      }
    }
  }, [title]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleAcceptClick = (message) => {
    console.log("답변 채택 클릭:", message);
    
    // 로컬 스토리지에서 대화 데이터 가져오기
    const savedData = localStorage.getItem('conversationData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        const { questionList, answerList } = parsedData;
  
        // 선택된 답변의 ID를 찾기
        const answer = answerList.find(answer => answer.content === message.text);
        
        if (answer) {
          // 선택된 답변의 질문 인덱스 찾기
          const index = answerList.indexOf(answer);
          const question = questionList[index];
          
          setModalData({
            id: answer.id,
            question: question,
            answer: answer.content
          });
        } else {
          console.log("답변을 찾을 수 없습니다.");
        }
        
      } catch (error) {
        console.error("로컬 스토리지에서 대화 데이터를 파싱하는 데 실패했습니다:", error);
      }
    } else {
      console.log("로컬 스토리지에 대화 데이터가 없습니다.");
    }

    setSelectedMessage(message);
    setModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedMessage) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("토큰이 없습니다. 로그인을 해주세요.");
      return;
    }

    const questionRoomId = localStorage.getItem("questionRoomId");
    const answerId = selectedMessage.id;

    const requestData = {
      questionRoomId,
      answerId
    };

    try {
      const response = await fetch("https://bugnyang.shop/api/question-room/adopt", {
        method: "PATCH",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();
      console.log("채택 응답:", data);
      
    } catch (error) {
      console.error("답변 채택 중 오류 발생:", error);
      alert("답변 채택 중 오류가 발생했습니다.");
    } finally {
      setModalOpen(false);
    }
  };

  const handleCloseModal = () => {
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
      return;
    }
  
    const questionRoomId = localStorage.getItem("questionRoomId");
  
    const requestData = {
      questionRoomId,
      question: searchQuery
    };
  
    setChatMessages([...chatMessages, { text: searchQuery, isUser: false }]);
    setSearchQuery("");
    setIsLoading(true);

    try {
      const response = await fetch("https://bugnyang.shop/api/question", {
        method: "POST",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });
  
      const data = await response.json();
  
      if (data.isSuccess && data.result && data.result.answer) {
        const savedData = localStorage.getItem('conversationData');
        let updatedData = { questionList: [], answerList: [] };
        if (savedData) {
          updatedData = JSON.parse(savedData);
        }
        updatedData.questionList.push(searchQuery);
        updatedData.answerList.push({ id: data.result.id, content: data.result.answer });
        localStorage.setItem('conversationData', JSON.stringify(updatedData));
  
        setChatMessages([...chatMessages, { text: searchQuery, isUser: false }, { text: data.result.answer, isUser: true, id: data.result.id }]);
      } else {
        alert("질문 전송에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("질문 제출 중 오류 발생:", error);
      alert("질문 전송 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdditionalTextClick = () => {
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
      {isModalOpen && selectedMessage && (
        <Modal
          title={title}        // 제목 추가
          id={modalData.id}            // ID
          question={modalData.question} // 질문
          answer={modalData.answer}     // 답변
          message="답변을 채택할까요?"   // 메시지
          description={`버그냥이 덕분에 골치 아픈 버그를 해결했어요!`} // 설명
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
          articleId={articleId}
        />
      )}
    </DetailContainer>
  );
};

export default ConversationDetail;