import React from 'react';
import styled from 'styled-components';
import Union from "../img/Union.png";
import SearchIconImg from "../img/searchicon.png";
import BugCatImg from "../img/bugcat.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: white;
  background-color: #6630FF;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left: 40px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  flex: 1;
  gap: 3vw;
  margin-right: 10vw;
`;

const NavItem = styled.a`
  margin: 0 15px;
  text-decoration: none;
  color: white;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;

const CatIcon = styled.div`
  font-size: 24px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 50px;
  background-color: #D9D9D9;
  height: 180px;
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
  padding: 20px;
  margin: 0 150px;
  color: black;
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
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
`;

const RankingBox = styled(Box)`
  display:flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
  width: 320px;
`;

const PostsBox = styled(Box)`
  background-color: #E8F0FF;
  padding: 20px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PostsContainer = styled.div`
  display: flex;
  gap: 20px; 
  overflow-x: auto;
`;

const PostItem = styled.div`
  flex: 1;
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  max-width: 24%;
  text-align: center;
`;


const Title = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 28.64px;
  color: #808080;
`;

const PostTitle=styled.div`
 text-align: start; 
 font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 28.64px;
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

const BugCount = ({ count }) => (
  <BugCountText>
    <Count>{count}</Count><Unit>마리</Unit>
  </BugCountText>
);

const RankingList = styled.div`
  border: 2px solid #808080;
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
  max-height: 300px;
  width: 300px;
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

const Mainpage = () => {
  const bugCount = 572;
  const rankingItems = [
    "버그 1",
    "버그 2",
    "버그 3",
    "버그 4",
    "버그 5"
  ];

  return (
    <Container>
      <Header>
        <Logo>버그냥이ꗯ</Logo>
        <Nav>
          <NavItem href="#">전체게시판</NavItem>
          <NavItem href="#">실시간 아우성</NavItem>
          <NavItem href="#">저장게시판</NavItem>
          <NavItem href="#">홈</NavItem>
        </Nav>
        <CatIcon><img src={Union} alt="Union" /></CatIcon>
      </Header>
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
            <Title>오늘 버그 랭킹</Title>
            <RankingList>
              {rankingItems.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </RankingList>
          </RankingBox>
        </Section>
        <PostsBox>
          <PostTitle>weon님을 위해 0000 관련 게시글을 모아봤어요!</PostTitle>
          <PostsContainer>
            <PostItem>게시글 1</PostItem>
            <PostItem>게시글 2</PostItem>
            <PostItem>게시글 3</PostItem>
            <PostItem>게시글 4</PostItem>
          </PostsContainer>
        </PostsBox>
      </Body>
    </Container>
  );
};

export default Mainpage;
