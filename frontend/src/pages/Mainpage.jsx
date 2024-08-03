import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/header";
import SearchIconImg from "../img/searchicon.png";
import BugCatImg from "../img/bugcat.png";
import LoginModal from '../components/Loginmodal'; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 3vw;
  background-color: #e8f0ff;
  height: 12vw;
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
  border-radius: 5vw;
  width: 40vw;
  height: 3vh;
  padding: 1vw 3vw;
  color: black;
  background-color: white;

  &::placeholder {
    color: #808080;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  right: 3vw;
  top: 50%;
  transform: translateY(-50%);
  width: 1.8vw;
  height: 1.8vw;
  cursor: pointer;
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
  margin-bottom: 2vw;

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
  flex-direction: column;
  justify-content: center;
  gap: 2vw;
  margin-bottom: 1.5vw;
  display:flex;
  justify-content: space-around;
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
  font-size: 1.7vw;
  font-weight: bold;
  padding: 1.5vw;
  margin-top: 2vw;
  border-radius: 1.2vw;
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
  cursor: pointer;
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
  width: 40%;
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
  background-color: #ffffff;
  color: #6630ff;
  border: none;
  border-radius: 50%;
  width: 3vw;
  height: 3vw;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bugCount, setBugCount] = useState(0);
  const [ranking, setranking] = useState([]);
  const [posts, setPosts] = useState([]); // 게시글 데이터 상태 변수
  const [page, setPage] = useState(0); // 현재 페이지 상태 변수
  const [size, setSize] = useState(5); // 한 페이지에 표시할 게시글 수 상태 변수
  const postsRef = useRef(); // 게시글 컨테이너 참조

  // 컴포넌트 마운트 시 API 호출 및 데이터 가져오기
  useEffect(() => {
    const fetchBugData = async () => {
      try {
        const response = await fetch("https://bugnyang.shop/api/article/today-error", {
          method: "GET",
        });
        const data = await response.json();
        if (data.isSuccess) {
          setBugCount(data.result.totalCount);
          setranking(data.result.ranking);
        } else {
          console.error("Failed to fetch bug count:", data.message);
        }
      } catch (error) {
        console.error("Error fetching bug count:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const tagName = "Swift"; // 동적으로 처리 가능한 부분
        const token = localStorage.getItem("token");

        const response = await fetch(`https://bugnyang.shop/api/article/recommend?tagName=${tagName}&page=${page}&size=${size}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // 요청 데이터 형식
            "Authorization": `${token}`, // Authorization 헤더에 토큰 추가
          },
        });
        const data = await response.json();
        if (data.isSuccess) {
          setPosts(data.result.articlePreviewList); // 게시글 데이터 업데이트
        } else {
          console.error("Failed to fetch posts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchBugData();
    fetchPosts(); // 컴포넌트 마운트 시 API 호출
  }, [page, size]); // 페이지나 사이즈가 변경될 때마다 호출

  // 로그인 상태 체크 함수
  const checkLogin = async () => {
    console.log(localStorage.getItem('isLogined'));
    if (localStorage.getItem('isLogined') === 'true') {
      return true;
    } else {
      return false;
    }
  };

  // 검색 입력값 변화
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 검색 제출
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const isLoggedIn = await checkLogin();
    console.log("Search Submit Clicked. Logged In:", isLoggedIn);
    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }
    const response = await fetch("https://bugnyang.shop/api/question/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: searchQuery,
    });

    if (response.ok) {
      navigate(`/question?query=${searchQuery}`);
    } else {
      alert("질문 등록에 실패했습니다.");
    }
  };

  // 검색 아이콘 클릭
  const handleSearchClick = async (e) => {
    e.preventDefault();
    const isLoggedIn = await checkLogin();
    if (!isLoggedIn) {
      setIsModalOpen(true);
    }
  };

  // 내가 잡은 버그 목록 버튼 클릭
  const handleSavePostClick = async (e) => {
    e.preventDefault();
    const isLoggedIn = await checkLogin();
    if (isLoggedIn) {
      navigate("/savePost");
    } else {
      setIsModalOpen(true);
    }
  };

  // 더 많은 게시글 링크 클릭
  const handleMorePostsClick = async (e) => {
    e.preventDefault();
    const isLoggedIn = await checkLogin();
    console.log("More Posts Clicked. Logged In:", isLoggedIn);
    if (isLoggedIn) {
      navigate("/allPost");
    } else {
      setIsModalOpen(true);
    }
  };

  // 개발자들의 아우성 페이지 클릭
  const handleLiveClick = async (e) => {
    e.preventDefault();
    const isLoggedIn = await checkLogin();
    console.log("Live Clicked. Logged In:", isLoggedIn);
    if (isLoggedIn) {
      navigate("/live");
    } else {
      setIsModalOpen(true);
    }
  };

  // 게시글 왼쪽으로 스크롤
  const scrollLeft = () => {
    console.log("Scroll Left Clicked");
    postsRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  // 게시글 오른쪽으로 스크롤
  const scrollRight = () => {
    console.log("Scroll Right Clicked");
    postsRef.current.scrollBy({ left: 300, behavior: "smooth" });
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
            onClick={handleSearchClick}
          />
          <SearchIcon src={SearchIconImg} alt="search icon" onClick={handleSearchSubmit} />
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
      {ranking.length > 0 && (
        <RankingList>
          {ranking.map((article, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-around' }}>
              <RankLanguage>{article.tagName}</RankLanguage>
              <RankCount>{article.count}마리</RankCount>
            </div>
          ))}
        </RankingList>
      )}
    </RankingItem>
  </RankingBox>
        </Section>
        <PostsBox>
          <PostTitle>
            <HighlightedText>weon</HighlightedText>님을 위해{" "}
            <HighlightedText>Swift</HighlightedText> 관련 게시글을 모아봤어요!
          </PostTitle>
          <PostsContainer ref={postsRef}>
            {posts.map(post => (
              <PostItem key={post.articleId}>
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.cause}</p>
                </div>
              </PostItem>
            ))}
          </PostsContainer>
          <LeftButton onClick={scrollLeft}>{"◁"}</LeftButton>
          <RightButton onClick={scrollRight}>{"▷"}</RightButton>
        </PostsBox>
        <MorePostsLink href="#" onClick={handleMorePostsClick}>더 많은 게시글들 보고 싶어요</MorePostsLink>
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
        <MorePostsLink href="#" onClick={handleLiveClick}>개발자들의 아우성 들으러가기</MorePostsLink>
      </Body>
      {isModalOpen && (
        <LoginModal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
      )}
    </Container>
  );
};

export default Mainpage;
