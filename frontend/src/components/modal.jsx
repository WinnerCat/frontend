import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Frame from "../img/Frame5.png";

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  right: 0;
  top: 0;
`;

const ModalContainer = styled.div`
  width: 35vw;
  height: 20.8vw;
  flex-shrink: 0;
  border-radius: 0.8vw;
  background: #fff;
  position: relative;
  left: 34%;
  top: 32%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 1.5vw;
  font-style: normal;
  font-weight: 700;
  line-height: 220%; /* 44px */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7vw;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5vw;
  width: 100%;
  height: 50%;
`;

const YesButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1vw;
  background: var(--6630FF, #6630ff);
  width: 4.5vw;
  height: 2.2vw;
  flex-shrink: 0;
  color: var(--FFFFFF, #fff);
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 700;
  line-height: 0%; /* 0px */
  cursor: pointer;
`;

const NoButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1vw;
  width: 4.5vw;
  height: 2.2vw;
  border: 0.05vw solid var(--6630FF, #6630ff);
  cursor: pointer;
  background-color: #e8f0ff;
  color: var(--6630FF, #6630ff);
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 700;
  line-height: 0%; /* 0px */
`;

const ImgContainer = styled.div`
  width: 2.3vw;
  height: 2.3vw;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2vw;
`;

const SubTitle = styled.div`
  color: var(--808080, #808080);
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  line-height: 220%; /* 33px */
`;

function Modal({ isOpen, closeModal, title }) {
  const navigate = useNavigate();

  return (
    <>
      <Container style={{ display: isOpen ? "block" : "none" }}>
        <ModalContainer>
          <ImgContainer>
            <img src={Frame} style={{ width: "100%", height: "100%" }} />
          </ImgContainer>
          <Title>{title}</Title>
          <SubTitle>같은 버그를 겪고 있는 개발자가 있을수도 있어요!</SubTitle>
          <ButtonContainer>
            <NoButton onClick={closeModal}>취소</NoButton>
            <YesButton onClick={() => navigate("/")}>확인</YesButton>
          </ButtonContainer>
        </ModalContainer>
      </Container>
    </>
  );
}
export default Modal;
