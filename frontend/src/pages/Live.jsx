import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/header";
import Union from "../img/Union2.png";

const Title = styled.span`
  color: var(--d-9-d-9-d-9, #000);
  font-family: Pretendard;
  font-size: 2.4vw;
  font-style: normal;
  font-weight: 800;
  line-height: 175%;
`;

const ColorTitle = styled.span`
  color: var(--6630FF, #6630ff);
  font-family: Pretendard;
  font-size: 2.4vw;
  font-style: normal;
  font-weight: 800;
  line-height: 175%; /* 84px */
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6.75vw;
  flex-direction: column;
`;
const Container60 = styled.div`
  width: 60%;
  display: flex;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 1.2vw;
`;

const LiveContainer = styled.div`
  width: 42.7vw;
  height: 27.2vw;
  flex-shrink: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
`;

function Live() {
  const lives = [""];

  return (
    <>
      <Header></Header>
      <Container>
        <Container60>
          <Title>
            <ColorTitle>개발자</ColorTitle>들의 <br></br>
            실시간<ColorTitle>아우성!!!!!!!</ColorTitle>
          </Title>
          <ImgContainer>
            <img
              src={Union}
              style={{
                width: "3vw",
                height: "3vw",
                display: "flex",
              }}
            />
          </ImgContainer>
        </Container60>
        <Container60>
          <LiveContainer>아아</LiveContainer>
        </Container60>
      </Container>
    </>
  );
}

export default Live;
