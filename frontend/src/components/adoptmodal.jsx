//답변을 채택할까요? 모달창
import React from 'react';
import styled from 'styled-components';
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
  src: url(${Checkimg});
  width: 2vw;
  margin-bottom: 1vw;
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
  margin-top:1vw;
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

const AdoptModal = ({ message, description, onClose, onConfirm }) => {
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
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
            <ModalButton primary onClick={onConfirm}>확인</ModalButton>
          </ModalButtonContainer>
        </ModalContent>
      </ModalOverlay>
    );
  };

export default AdoptModal;
