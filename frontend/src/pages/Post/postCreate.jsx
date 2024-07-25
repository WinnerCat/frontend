import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/header";
import Rectangle from "../../img/Rectangle.png";
import Tag from "../../components/tag";
import TagDropdown from "../../components/tagDropdown";

const Title = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 1.6vw;
  font-style: normal;
  font-weight: 600;
  line-height: 175%; /* 56px */
  margin-bottom: 1.6vw;
`;

const ColorTitle = styled.span`
  color: var(--6630FF, #6630ff);
  font-family: Pretendard;
  font-size: 1.6vw;
  font-style: normal;
  font-weight: 600;
  line-height: 175%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6.75vw;
  flex-direction: column;
`;

const Container80 = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const InputContainerTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 1.2vw;
  font-style: normal;
  font-weight: 600;
  line-height: 175%; /* 42px */
  margin-bottom: 0.5vw;
`;

const Input = styled.input`
  width: 100%;
  height: 3vw;
  flex-shrink: 0;
  border-radius: 0.8vw;
  border: 0.05vw solid #000;
  margin-bottom: 1.95vw;
  padding: 0.5vw;
  color: #000;
  font-family: Inter;
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  line-height: 200%; /* 40px */
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 10vw;
  flex-shrink: 0;
  border-radius: 0.8vw;
  border: 0.05vw solid #000;
  margin-bottom: 1.95vw;
  padding: 0.5vw;
  color: #000;
  font-family: Inter;
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  line-height: 200%; /* 40px */
  resize: none;
`;

function PostCreate() {
  const [tags, setTags] = useState([]);

  return (
    <>
      <Header />
      <Container>
        <Container80>
          <Title>
            <ColorTitle>버그냥이 </ColorTitle>덕분에
            <br></br>
            이런 부분을 <ColorTitle>해결</ColorTitle>했어요!
            <img
              src={Rectangle}
              style={{ width: "3vw", height: "3vw", marginLeft: "1.7vw" }}
            />
          </Title>
          <InputContainerTitle>제목</InputContainerTitle>
          <Input placeholder="제목을 작성 해주세요." />
          <InputContainerTitle>태그</InputContainerTitle>
          <TagDropdown tags={tags} setTags={setTags} />
          <InputContainerTitle>원인</InputContainerTitle>
          <TextArea placeholder="내용을 작성 해주세요." />
          <InputContainerTitle>해결방법</InputContainerTitle>
          <TextArea placeholder="내용을 작성 해주세요." />
        </Container80>
      </Container>
    </>
  );
}

export default PostCreate;
