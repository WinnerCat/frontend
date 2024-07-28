import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/header";
import SearchIconImg from "../img/searchicon.png";
import BugCatImg from "../img/bugcat.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 2vw;
  background-color: #d9d9d9;
  height: 20vh;
`;

const SearchContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.input`
  font-size: 1.3vw;
  border: none;
  border-radius: 50px;
  width: 40vw;
  height: 3vh;
  padding: 1vw 3vw;
  color: white;
  background-color: #6630ff;

  &::placeholder {
    color: white;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 16px;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
`;

const Body = styled.div`
  flex: 1;
  padding: 2vw;
  margin: 5vw 10vw;
  color: black;

  @media (max-width: 768px) {
    margin: 2vw 5vw;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Box = styled.div`
  flex: 1;
  background-color: #ffffff;
  text-align: center;
`;

const BugBox = styled(Box)``;

const RankingBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const RankingItem = styled.div`
  border: 2px solid #808080;
  border-radius: 1vw;
  width: 70%;
`;

const RankingList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2vw;
  margin-bottom: 1vw;
`;

const RankLanguage = styled.div`
  display: inline-block;
  border: none;
  background-color: #d9d9d9;
  border-radius: 0.5vw;
  padding: 0.2vw 1vw;
`;

const RankCount = styled.span`
  color: #808080;
`;

const PostsBox = styled.div`
  background-color: #e8f0ff;
  padding: 5vw 8vw;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 16px;
  position: relative;

  @media (max-width: 768px) {
    padding: 2vw 4vw;
  }
`;

const PostsContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: hidden;
  position: relative;

  @media (max-width: 768px) {
    overflow-x: scroll;
  }
`;

const PostItem = styled.div`
  flex: 0 0 24%;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 768px) {
    flex: 0 0 80%;
  }
`;

const HighlightedText = styled.span`
  color: #6630ff;
  font-weight: bold;
`;

const PostTitle = styled.div`
  text-align: start;
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 24px;
  color: #808080;
`;

const Myquestionhistory = styled.button`
  background-color: #6630ff;
  color: #fff;
  font-size: 1.8vw;
  font-weight: bold;
  padding: 1.5vw;
  margin-top: 2vw;
  border-radius: 10px;
  width: 70%;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #4a25c1;
  }
`;

const MorePostsLink = styled.a`
  color: #808080;
  font-size: 14px;
  display: flex;
  justify-content: flex-end;
  margin-top: 1vw;
  text-decoration: underline;
  width: 100%;
`;

const Title = styled.h2`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 2vw;
  color: #808080;
`;

const BugCountText = styled.div`
  font-family: "Pretendard", sans-serif;
  font-size: 5vw;
  font-weight: 800;
  text-align: left;
  color: #6630ff;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 10px;
`;

const Count = styled.span`
  color: #6630ff;
`;

const Unit = styled.span`
  color: #000000;
`;

const BugcatImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vw;
  margin-top: 5vw;
`;

const ChatMessage = styled.div`
  display: flex;
  align-items: center;
`;

const ChatMessage1 = styled.div`
  position: relative;
  bottom: 1.5vw;
  left: 27vw;
`;

const ChatMessage2 = styled.div`
  position: relative;
  bottom: 0.5vw;
  left: 10vw;
  display: flex;
  align-items: center;
`;

const UserMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e8f0ff;
  color: #000;
  padding: 10px;
  border-radius: 10px;
  margin-left: 10px;
  width: 600px;
  height: 50px;
`;

const BotMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6630ff;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  align-self: flex-end;
  margin-right: 10px;
  width: 600px;
  height: 50px;
`;

const BugCount = ({ count }) => (
  <BugCountText>
    <Count>{count}</Count>
    <Unit>마리</Unit>
  </BugCountText>
);

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #6630ff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: #4a25c1;
  }
`;

const LeftButton = styled(ScrollButton)`
  left: -15px;
`;

const RightButton = styled(ScrollButton)`
  right: -15px;
`;

const Mainpage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const bugCount = 572;
  const postsRef = useRef();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/question?query=${searchQuery}`);
  };

  const scrollLeft = () => {
    postsRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    postsRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <Container>
      <Header />
      <Content>
        <SearchContainer onSubmit={handleSearchSubmit}>
          <SearchInput
            type="text"
            placeholder="어떤 에러가 발생하였나요?"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <SearchIcon src={SearchIconImg} alt="search icon" />
        </SearchContainer>
      </Content>
      <Body>
        <Section>
          <BugBox>
            <Title>오늘 잡은 버그</Title>
            <BugCount count={bugCount} />
            <BugcatImage src={BugCatImg} alt="오늘 잡은 버그 이미지" />
          </BugBox>
          <RankingBox>
            <RankingItem>
              <Title>오늘의 버그 랭킹</Title>
              <RankingList>
                <RankLanguage>Spring</RankLanguage>
                <RankCount>287마리</RankCount>
              </RankingList>
              <RankingList>
                <RankLanguage>Spring</RankLanguage>
                <RankCount>287마리</RankCount>
              </RankingList>
              <RankingList>
                <RankLanguage>Spring</RankLanguage>
                <RankCount>287마리</RankCount>
              </RankingList>
              <RankingList>
                <RankLanguage>Spring</RankLanguage>
                <RankCount>287마리</RankCount>
              </RankingList>
            </RankingItem>
            <Myquestionhistory>내가 잡은 버그 목록</Myquestionhistory>
          </RankingBox>
        </Section>
        <PostsBox>
          <PostTitle>
            <HighlightedText>weon</HighlightedText>님을 위해{" "}
            <HighlightedText>Swift</HighlightedText> 관련 게시글을 모아봤어요!
          </PostTitle>
          <PostsContainer ref={postsRef}>
            <PostItem>Index out of range</PostItem>
            <PostItem>Index out of range</PostItem>
            <PostItem>Index out of range</PostItem>
            <PostItem>Index out of range</PostItem>
            <PostItem>Index out of range</PostItem>
            <PostItem>Index out of range</PostItem>
            <PostItem>Index out of range</PostItem>
          </PostsContainer>
          <LeftButton onClick={scrollLeft}>{"<"}</LeftButton>
          <RightButton onClick={scrollRight}>{">"}</RightButton>
        </PostsBox>
        <MorePostsLink href="#">더 많은 게시글들 보고 싶어요</MorePostsLink>
        <ChatBox>
          <ChatMessage>
            <UserMessage>
              아직도 시작 못하신함??ㅋㅋㅋㅠㅠ 버그 왜이래
            </UserMessage>
          </ChatMessage>
          <ChatMessage1>
            <BotMessage>하................이거 맞나?</BotMessage>
          </ChatMessage1>
          <ChatMessage2>
            <BotMessage>프론트개발 하지마세요 진짜에요</BotMessage>
          </ChatMessage2>
        </ChatBox>
        <MorePostsLink href="#">개발자들의 아우성 들으러가기</MorePostsLink>
      </Body>
    </Container>
  );
};

export default Mainpage;
