import React from 'react';
import styled from 'styled-components';
import ModalLogoImage from "../img/logo.png";
import { useNavigate } from 'react-router-dom';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 3vw;
  border-radius: 1vw;
  text-align: center;
  width: 30vw;
`;

const ModalLogo = styled.img`
  width: 50%;
  margin-bottom: 2vw;
`;

const ModalTitle = styled.h2`
  font-size: 1.5vw;
  color: #000000;
  margin: 0;
`;

const ModalSubtitle = styled.p`
  font-size: 1vw;
  color: #808080;
  margin: 0.5vw 0 1vw 0;
`;

const ModalButton = styled.button`
  background-color: #6630FF;
  color: white;
  border: none;
  padding: 0.8vw 1vw;
  border-radius: 0.5vw;
  cursor: pointer;
  font-size: 1vw;
  margin: 1vw 0 1vw 0;
  width: 60%;

  &:hover {
    background-color: #4a25c1;
  }
`;

const LoginModal = ({ isModalOpen, closeModal }) => {
  const navigate = useNavigate();

  if (!isModalOpen) return null;

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalLogo src={ModalLogoImage} alt="버그냥이 로고" />
        <ModalTitle>로그인하고 더 다양한 기능을 이용하세요!</ModalTitle>
        <ModalSubtitle>당신의 버그를 같이 해결 해줄게요!</ModalSubtitle>
        <ModalButton onClick={() => navigate('/login')}>로그인</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;
