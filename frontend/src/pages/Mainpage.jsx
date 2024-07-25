import React from 'react';
import styled from 'styled-components';
import Header from '../components/header';
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
  padding: 50px;
  background-color: #D9D9D9;
  height: 180px;

  @media (max-width: 768px) {
    padding: 30px;
    height: auto;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 20px;
  border: none;
  border-radius: 50px;
  width: 500px;
  height: 30px;
  padding-left: 30px;
  padding-right: 50px;
  color: white;
  background-color: #6630FF;

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
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const BugBox = styled(Box)`
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const RankingBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
  width: 100%;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

const RankingList = styled.div`
  width:80%;
  border: 2px solid #808080;
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid #E0E0E0;

  &:last-child {
    border-bottom: none;
  }
`;

const PostsBox = styled.div`
  background-color: #E8F0FF;
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
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    overflow-x: scroll;
  }
`;

const PostItem = styled.div`
  flex: 0 0 24%;
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  scroll-snap-align: start;

  @media (max-width: 768px) {
    flex: 0 0 80%;
  }
`;

const HighlightedText = styled.span`
  color: #6630FF;
  font-weight: bold;
`;

const HighlightedItem = styled.span`
  background-color: #E0E0E0;
  padding: 2px 4px;
  border-radius: 4px;
`;

const PostTitle = styled.div`
  text-align: start;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 24px;
  color: #808080;
`;

const Myquestionhistory = styled.button`
  background-color: #6630FF;
  color: #FFF;
  font-size: 20px;
  padding: 2vw;
  margin-top: 2vw;
  border-radius: 10px;
  width: 90%;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #4a25c1;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 18px;
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
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 24px;
  color: #808080;
`;

const BugCountText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 96px;
  font-weight: 800;
  text-align: left;
  color: #6630FF;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 10px;
`;

const Count = styled.span`
  color: #6630FF;
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
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-top: 5vw;
`;

const ChatMessage = styled.div`
  display: flex;
  align-items: center;
`;

const UserMessage = styled.div`
  background-color: #E8F0FF;
  color: #000;
  padding: 10px;
  border-radius: 10px;
  margin-left: 10px;
  width: 600px;
  height: 50px;
`;

const BotMessage = styled.div`
  background-color: #6630FF;
  color: #FFF;
  padding: 10px;
  border-radius: 10px;
  align-self: flex-end;
  margin-right: 10px;
  width: 600px;
  height: 50px;
`;

const BugCount = ({ count }) => (
  <BugCountText>
    <Count>{count}</Count><Unit>마리</Unit>
  </BugCountText>
);

const Mainpage = () => {
  const bugCount = 572;
  const rankingItems = [
    "Spring 287마리",
    "React 133마리",
    "Spring 42마리",
    "Spring 42마리"
  ];

  const formatRankingItem = (item) => {
    const parts = item.split(' ');
    return (
      <ListItem key={item}>
        <HighlightedItem>{parts[0]}</HighlightedItem> {parts[1]}
      </ListItem>
    );
  };

  return (
    <Container>
      <Header/>
      <Content>
        <SearchContainer>
          <SearchInput type="text" placeholder="어떤 에러가 발생하였나요?" />
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
            <Title>오늘의 버그 랭킹</Title>
            <RankingList>
              {rankingItems.map(formatRankingItem)}
            </RankingList>
            <Myquestionhistory>나의 질문 내역보기</Myquestionhistory>
          </RankingBox>
        </Section>
        <PostsBox>
          <PostTitle><HighlightedText>weon</HighlightedText>님을 위해 <HighlightedText>Swift</HighlightedText> 관련 게시글을 모아봤어요!</PostTitle>
          <PostsContainer>
            <PostItem>Index out of range</PostItem>
            <PostItem>Index out of range</PostItem>
            <PostItem>Index out of range</PostItem>
            <PostItem>Index out of range</PostItem>
            <PostItem>Index out of range</PostItem>
            <PostItem>Index out of range</PostItem>
            <PostItem>Index out of range</PostItem>
          </PostsContainer>
        </PostsBox>
        <MorePostsLink href="#">더 많은 게시글들 보고 싶어요</MorePostsLink>
        <ChatBox>
          <ChatMessage>
            <UserMessage>아직도 시작 못하신함??ㅋㅋㅋㅠㅠ 버그 왜이래</UserMessage>
          </ChatMessage>
          <ChatMessage>
            <BotMessage>하................이거 맞나?</BotMessage>
          </ChatMessage>
          <ChatMessage>
            <BotMessage>프론트개발 하지마세요 진짜에요</BotMessage>
          </ChatMessage>
        </ChatBox>
        <MorePostsLink href="#">개발자들의 아우성 들으러가기</MorePostsLink>
      </Body>
    </Container>
  );
};

export default Mainpage;
