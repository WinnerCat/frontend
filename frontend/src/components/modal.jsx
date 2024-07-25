import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  width: 25vw;
  height: 10.8vw;
  flex-shrink: 0;
  border-radius: 0.8vw;
  background: #fff;
  position: relative;
  left: 40%;
  top: 40%;
`;

const Title = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  line-height: 220%; /* 44px */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7vw;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
`;

const YesButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-family: Inter;
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  line-height: 220%; /* 44px */
  width: 50%;
  height: 70%;
  border-top: solid 0.05vw #000;
  border-right: solid 0.05vw #000;
  cursor: pointer;
`;

const NoButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-family: Inter;
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  line-height: 220%; /* 44px */
  width: 50%;
  height: 70%;
  border-top: solid 0.05vw #000;
  cursor: pointer;
`;

function Modal({ isOpen, closeModal, title }) {
  const navigate = useNavigate();

  return (
    <>
      <Container style={{ display: isOpen ? "block" : "none" }}>
        <ModalContainer>
          <Title>{title}</Title>
          <ButtonContainer>
            <YesButton onClick={() => navigate("/")}>네</YesButton>
            <NoButton onClick={closeModal}>아니요</NoButton>
          </ButtonContainer>
        </ModalContainer>
      </Container>
    </>
  );
}
export default Modal;
