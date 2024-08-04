import styled from "styled-components";
import React, { useState } from "react";
import success from "../img/Foot.png";

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
  position: relative;
  left: 35%;
  top: 20%;
`;

function SuccessModal({ isOpen, closeModal }) {
  return (
    <>
      <Container
        style={{ display: isOpen ? "block" : "none" }}
        onClick={closeModal}
      >
        <ModalContainer>
          <img src={success} />
        </ModalContainer>
      </Container>
    </>
  );
}
export default SuccessModal;
