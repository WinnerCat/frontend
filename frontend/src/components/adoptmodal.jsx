import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Checkimg from '../img/Check.png';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 3vw 6vw;
  border-radius: 1vw;
  text-align: center;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalIcon = styled.img`
  width: 2vw;
  margin-bottom: 1vw;
`;

const ModalTitle = styled.h2`
  font-size: 1.5vw;
  margin: 0;
  font-weight: bold;
`;

const ModalText = styled.p`
  font-size: 1.2vw;
  font-weight: bold;
  margin: 0.5vw 0;
`;

const ModalDescription = styled.p`
  font-size: 1vw;
  margin: 0.5vw 0 2vw 0;
  color: #808080;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 2vw;
  margin-top: 1vw;
`;

const ModalButton = styled.button`
  padding: 0.5vw 2vw;
  border: 1px solid #6630ff;
  border-radius: 1vw;
  cursor: pointer;
  font-size: 1vw;
  background-color: ${props => (props.primary ? '#6630ff' : 'white')};
  color: ${props => (props.primary ? 'white' : '#6630ff')};

  &:hover {
    background-color: ${props => (props.primary ? '#551fcc' : '#f0f0f0')};
  }
`;

const AdoptModal = ({ title, id, question, answer, message, description, onClose, onConfirm, articleId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // 컴포넌트가 렌더링될 때 속성 값 로그 찍기
    console.log("AdoptModal props:", {
      title,
      id,
      question,
      answer,
      message,
      description,
    });
  }, [title, id, question, answer, message, description]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = async () => {
    const token = localStorage.getItem("token");
    localStorage.setItem("title",title);
    localStorage.setItem("answer",answer);
    
    if (!token) {
      alert("토큰이 없습니다. 로그인을 해주세요.");
      return;
    }

    const questionRoomId = localStorage.getItem("questionRoomId");

    const requestData = {
      questionRoomId,
      answerId: id // ID 사용
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

      if (data.isSuccess) {
        navigate(`/postUpdate/${articleId}`);
      } else {
        alert("답변 채택에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error("답변 채택 중 오류 발생:", error);
      alert("답변 채택 중 오류가 발생했습니다.");
    } finally {
      onConfirm();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <ModalIcon src={Checkimg} alt="check icon" />
        <ModalText>{message}</ModalText>
        <ModalDescription>{description}</ModalDescription>
        <ModalButtonContainer>
          <ModalButton onClick={onClose}>취소</ModalButton>
          <ModalButton primary onClick={handleConfirm}>확인</ModalButton>
        </ModalButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AdoptModal;
