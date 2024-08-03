import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../components/header";
import Union from "../img/Union2.png";
import LiveComment from "../components/liveComment";
import Config from "../config/config";

// 스타일 컴포넌트
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
  height: 35.2vw;
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
  padding: 1vw; /* 텍스트와 placeholder에 동일한 padding */
  font-size: 1.1vw;
  line-height: 1.5vw; /* placeholder와 입력된 텍스트의 line-height 일치 */
  box-sizing: border-box; /* padding이 width에 포함되도록 설정 */
  border-radius: 1vw;
  border: 0.05vw solid var(--808080, #808080);
  display: flex;
  justify-content: center;
  align-items: center;

  &::placeholder {
    color: #999;
    font-size: 1.1vw;
    line-height: 1.5vw; /* placeholder의 line-height 일치 */
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
  const [data, setData] = useState([]);
  const [content, setContent] = useState("");

  const handleContentChange = (value) => {
    setContent(value);
  };

  // 아우성 조회
  const fetchData = async () => {
    try {
      const response = await fetch(`${Config.baseURL}/api/scream`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        setData(data.result.screams);
      } else {
        alert("데이터를 불러오는데 실패했습니다.");
      }
    } catch (error) {
      alert("에러 발생");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000); // 5초마다 새 데이터 가져옴
    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 해제
  }, []);

  // 아우성 등록
  const handleCreate = async () => {
    try {
      const response = await fetch(`${Config.baseURL}/api/scream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        setContent(""); // 입력 필드 초기화
        fetchData(); // 새로운 아우성 등록 후 데이터 갱신
      } else {
        alert("오류발생");
      }
    } catch (error) {
      alert("에러발생");
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Container60>
          <Title>
            <ColorTitle>개발자</ColorTitle>들의 <br />
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
            {data.map((comment, index) => (
              <LiveComment
                key={index}
                content={comment.content}
                time={comment.timeAgo}
              />
            ))}
          </LiveContainer>
        </Container60>
        <Container60>
          <InputContainer>
            <Input
              placeholder="답답한 그 마음 여기에 외쳐보세요!"
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
            />
            <F5Button onClick={handleCreate}>외침</F5Button>
          </InputContainer>
        </Container60>
      </Container>
    </>
  );
}

export default Live;
