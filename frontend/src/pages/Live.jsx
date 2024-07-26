import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/header";
import Union from "../img/Union2.png";
import LiveComment from "../components/liveComment";

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
  height: 27.2vw;
  width: 100%;
  margin-top: 4vw;
  flex-shrink: 0;
  background-image: linear-gradient(to bottom, black, white);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 3.3vw;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10vw;
`;

const Input = styled.input`
  width: 87%;
  height: 100%;
  flex-shrink: 0;
  border-radius: 1.1vw;
  border: 0.05vw solid var(--808080, #808080);
  display: flex;
  justify-content: center;
  align-items: center;
  &::placeholder {
    color: var(--d-9-d-9-d-9, #d9d9d9);
    font-family: Inter;
    font-size: 1.1vw;
    font-style: normal;
    font-weight: 700;
    line-height: 220%; /* 48.4px */
    padding: 1.7vw;
  }
`;

const F5Button = styled.div`
  width: 4vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.8vw;
  background: var(--6630FF, #6630ff);
  color: #fff;
  font-family: Pretendard;
  font-size: 1.2vw;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

function Live() {
  const lives = [
    {
      content: "ios개발 하지마세요. 진지해요.",
      time: "2분전",
    },
    { content: "안자는 사람? ㅋㅋ", time: "5분전" },
    { content: "진짜 오늘 너무 안된다", time: "11분전" },
    { content: "지금 비가 너무 많이와", time: "17분전" },
    { content: "날씨가 오락가락 미친날씨", time: "42분전" },
    { content: "잠 좀 자고싶다", time: "1시간전" },
    { content: "님들 개발 원래 이렇게 힘듦?", time: "2시간전" },
    { content: "너넨 이런거 하지마라..", time: "2시간전" },
  ];

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
          <LiveContainer>
            {lives.map((live, index) => (
              <LiveComment
                key={index}
                content={live.content}
                time={live.time}
              />
            ))}
          </LiveContainer>
        </Container60>
        <Container60>
          <InputContainer>
            <Input placeholder="답답한 그 마음 여기에 외쳐보세요!"></Input>
            <F5Button>F5</F5Button>
          </InputContainer>
        </Container60>
      </Container>
    </>
  );
}

export default Live;
