import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/header";
import SearchIconImg from "../img/searchicon.png";
import BugCatImg from "../img/bugcat.png";
import LoginModal from "../components/Loginmodal";

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

const SearchInput = styled.textarea`
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
  align-items: center;
  gap: 2vw;
  margin-bottom: 1.5vw;
`;

const RankLanguage = styled.div`
  display: inline-block;
  border: none;
  background-color: #d9d9d9;
  border-radius: 0.5vw;
  padding: 0.2vw 1vw;
  font-size: 1.2vw;
`;

const RankCount = styled.span`
  color: #808080;
  font-size: 1.2vw;
`;

const PostsBox = styled.div`
  background-color: #e8f0ff;
  padding: 5vw 8vw;
  margin-top: 5vw;
  display: flex;
  flex-direction: column;
  gap: 2vw;
  border-radius: 1.5vw;
  position: relative;

  @media (max-width: 768px) {
    padding: 2vw 4vw;
  }
`;

const PostsContainer = styled.div`
  display: flex;
  gap: 2vw;
  padding: 1vw;
  overflow-x: hidden;
  position: relative;
  width: 100%;
  justify-content: flex-start;
`;

const PostItem = styled.div`
  padding: 2vw;
  width: 9vw;
  border-radius: 1vw;
  box-shadow: 0 0.02vw 0.04vw rgba(0, 0, 0, 0.1);
  height: 20vw;
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(255, 255, 255, 0.7) 90%
  );
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #6630ff;
    box-shadow: 0 0.03vw 0.6vw rgba(0, 0, 0, 0.2);
  }
`;

const TextContainer = styled.div`
  width: 100%;
  /* background-image: linear-gradient(to bottom, black, white);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent; */
`;

const PTitle = styled.div`
  font-size: 1.5vw;
  width: 100%;
  font-weight: bold;
  margin-bottom: 1vw;
  text-overflow: ellipsis; /* 너무 긴 텍스트를 '...'으로 표시 */
  /* white-space: nowrap; 텍스트를 한 줄로 유지 */
  overflow: hidden; /* 텍스트가 넘칠 때 숨김 처리 */
  width: 100%; /* 부모 요소에 맞게 확장 */
`;

const PCause = styled.div`
  font-size: 1.2vw;
  text-align: center;
  text-overflow: ellipsis; /* 너무 긴 텍스트를 '...'으로 표시 */
  /* white-space: nowrap; 텍스트를 한 줄로 유지 */
  overflow: hidden; /* 텍스트가 넘칠 때 숨김 처리 */
  width: 100%; /* 부모 요소에 맞게 확장 */
`;

const HighlightedName = styled.span`
  color: #6630ff;
  font-size: 1.5vw;
  font-weight: bold;
  padding: 0.3vw 1vw;
`;

const HighlightedText = styled.span`
  color: #e8f0ff;
  font-size: 1.5vw;
  font-weight: bold;
  padding: 0.3vw 1vw;
  border-radius: 2vw;
  background-color: ${({ bgColor }) => bgColor || "#6630ff"};
  margin-right: 1vw;
  margin-left: 1vw;
`;

const PostTitle = styled.div`
  text-align: start;
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 1.8vw;
  color: #808080;
  display: flex;
  align-items: center;
`;

const Myquestionhistory = styled.button`
  background-color: #6630ff;
  color: #fff;
  font-size: 1.3vw;
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
  font-size: 1.1vw;
  display: flex;
  justify-content: flex-end;
  margin-top: 1vw;
  text-decoration: underline;
  text-decoration-color: #d9d9d9;
  width: 100%;
  cursor: pointer;

  /* 동그라미 아이콘 스타일 */
  &::after {
    content: ">";
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5vw;
    height: 1.5vw;
    border-radius: 50%;
    background-color: #d9d9d9;
    color: #fff;
    font-size: 1vw;
    margin-left: 0.2vw;
    text-align: center;
  }
`;

const Title = styled.h2`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 1.5vw;
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
  align-items: center;
  gap: 0.5vw;
  margin-top: 5vw;
`;

const ChatMessage = styled.div`
  display: flex;
  align-items: center;
`;

const ChatMessage1 = styled.div`
  position: relative;
  bottom: 2vw;
  right: 10vw;
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
  padding: 1vw;
  border-radius: 1vw;
  margin-left: 1vw;
  width: 50vw;
  height: 3vw;
  font-size: 1.2vw;
`;

const BotMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6630ff;
  color: #fff;
  padding: 1vw;
  border-radius: 1vw;
  align-self: flex-end;
  margin-right: 1vw;
  width: 40vw;
  height: 3vw;
  font-size: 1.2vw;
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
  left: 2vw;
`;

const RightButton = styled(ScrollButton)`
  right: 2vw;
`;

const Mainpage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bugCount, setBugCount] = useState(0);
  const [ranking, setranking] = useState([]);
  const [posts, setPosts] = useState([]); // 게시글 데이터 상태 변수
  const [page, setPage] = useState(0); // 현재 페이지 상태 변수
  const [size, setSize] = useState(4); // 한 페이지에 표시할 게시글 수 상태 변수
  const postsRef = useRef(); // 게시글 컨테이너 참조
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [jwt, setJwt] = useState("");

  const languages = [
    { tagName: "JavaScript", color: "#F7DF1E" },
    { tagName: "Python", color: "#306998" },
    { tagName: "Java", color: "#5382A1" },
    { tagName: "C#", color: "#239120" },
    { tagName: "C/C++", color: "#00599C" },
    { tagName: "Swift", color: "#FA7343" },
    { tagName: "Kotlin", color: "#0095D5" },
    { tagName: "TypeScript", color: "#3178C6" },
    { tagName: "React", color: "#61DAFB" },
    { tagName: "Angular", color: "#DD0031" },
    { tagName: "Vue.js", color: "#4FC08D" },
    { tagName: "Django", color: "#092E20" },
    { tagName: "Flask", color: "#000000" },
    { tagName: "Spring", color: "#6DB33F" },
    { tagName: "Express", color: "#000000" },
    { tagName: "NestJS", color: "#E0234E" },
    { tagName: "iOS", color: "#A2AAAD" },
    { tagName: "Android", color: "#3DDC84" },
    { tagName: "React Native", color: "#137CBD" },
    { tagName: "Flutter", color: "#02569B" },
    { tagName: "SQL", color: "#00758F" },
  ];

  useEffect(() => {
    const fetchInitialPosts = async () => {
      await fetchPostsByLanguage(languages[currentLanguageIndex].tagName);
    };
    fetchInitialPosts();
  }, [currentLanguageIndex, page, size]);

  // 컴포넌트 마운트 시 API 호출 및 데이터 가져오기
  useEffect(() => {
    const getCookie = (name) => {
      const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
      for (const cookie of cookies) {
        if (cookie.startsWith(`${name}=`)) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    };

    const token = getCookie("Authorization");
    const token2 = getCookie("email");
    const token3 = getCookie("JSESSIONID");
    const token4 = getCookie("perf_dv6Tr4n");
    // console.log("Token:", token);
    // console.log("email:", token2);
    // console.log("Js:", token3);
    // console.log("perf:", token4);

    if (token) {
      setJwt("Bearer " + token);
      localStorage.setItem("token", token);
      localStorage.setItem("email", token);
      localStorage.setItem("isLogined", "true");
    }

    const getEmailFromLocalStorage = () => {
      const email = localStorage.getItem("email");
      if (email) {
        const emailPrefix = email.split("@")[0];
        setUserEmail(emailPrefix);
      }
    };

    getEmailFromLocalStorage();

    const fetchBugData = async () => {
      try {
        const response = await fetch(
          "https://bugnyang.shop/api/article/today-error",
          {
            method: "GET",
          }
        );
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

    // const fetchPosts = async () => {
    //   try {
    //     const token = localStorage.getItem("token");

    //     const allPosts = [];
    //     for (const lang of languages) {
    //       const response = await fetch(
    //         `https://bugnyang.shop/api/article/recommend?tagName=${lang.tagName}&page=${page}&size=${size}`,
    //         {
    //           method: "GET",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //         }
    //       );
    //       const data = await response.json();
    //       if (data.isSuccess) {
    //         allPosts.push(...data.result.articlePreviewList);
    //       } else {
    //         console.error("Failed to fetch posts:", data.message);
    //       }
    //     }
    //     setPosts(allPosts);
    //   } catch (error) {
    //     console.error("Error fetching posts:", error);
    //   }
    // };

    fetchBugData();
    // fetchPosts();
  }, [page, size]);
  const fetchPostsByLanguage = async (language) => {
    try {
      const response = await fetch(
        `https://bugnyang.shop/api/article/recommend?tagName=${language}&page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.isSuccess) {
        setPosts(data.result.articlePreviewList);
      } else {
        console.error("Failed to fetch posts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // 로그인 상태 체크 함수
  const checkLogin = async () => {
    console.log(localStorage.getItem("isLogined"));
    if (localStorage.getItem("isLogined") === "true") {
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
  const scrollLeftButton = async () => {
    console.log("Scroll Left Clicked");
    // postsRef.current.scrollBy({ left: -300, behavior: "smooth" });
    const prevIndex =
      (currentLanguageIndex - 1 + languages.length) % languages.length;
    setCurrentLanguageIndex(prevIndex);
    await fetchPostsByLanguage(languages[prevIndex].tagName);
  };

  // 게시글 오른쪽으로 스크롤
  const scrollRightButton = async () => {
    console.log("Scroll Right Clicked");
    // postsRef.current.scrollBy({ left: 300, behavior: "smooth" });
    const nextIndex = (currentLanguageIndex + 1) % languages.length;
    setCurrentLanguageIndex(nextIndex);
    await fetchPostsByLanguage(languages[nextIndex].tagName);
  };

  const handleDetail = async (post) => {
    const isLoggedIn = await checkLogin();
    console.log("postDetail Clicked. Logged In:", isLoggedIn);
    if (isLoggedIn) {
      navigate(`/postDetail/${post.articleId}`);
    } else {
      setIsModalOpen(true);
    }
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
          <SearchIcon
            src={SearchIconImg}
            alt="search icon"
            onClick={handleSearchSubmit}
          />
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
                    <div
                      key={index}
                      style={{
                        width: "55%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <RankLanguage>{article.tagName}</RankLanguage>
                      <RankCount>{article.count}마리</RankCount>
                    </div>
                  ))}
                </RankingList>
              )}
            </RankingItem>
            <Myquestionhistory onClick={handleSavePostClick}>
              내가 잡은 버그 목록
            </Myquestionhistory>
          </RankingBox>
        </Section>
        <PostsBox>
          <PostTitle>
            {/* <HighlightedName bgColor={languages[currentLanguageIndex].color}>
              {userEmail}
            </HighlightedName>
            {"님을 위해 "}
            <HighlightedName>weon</HighlightedName>님을 위해{" "} */}
            회원님을 위해{" "}
            <HighlightedText bgColor={languages[currentLanguageIndex].color}>
              {languages[currentLanguageIndex].tagName}
            </HighlightedText>
            {" 관련 게시글을 모아봤어요! "}
          </PostTitle>
          <PostsContainer ref={postsRef}>
            {posts.map((post) => (
              <PostItem key={post.articleId} onClick={() => handleDetail(post)}>
                <TextContainer>
                  <PTitle>{post.title}</PTitle>
                  <PCause>{post.cause}</PCause>
                </TextContainer>
              </PostItem>
            ))}
          </PostsContainer>
          <LeftButton onClick={scrollLeftButton}>{"◁"}</LeftButton>
          <RightButton onClick={scrollRightButton}>{"▷"}</RightButton>
        </PostsBox>
        <MorePostsLink href="#" onClick={handleMorePostsClick}>
          더 많은 게시글들 보고 싶어요
        </MorePostsLink>
        <ChatBox>
          <ChatMessage>
            <UserMessage>
              웨 에러 나??????ㅠㅠㅠㅠㅠ 나랑 버그 잡을래?
            </UserMessage>
          </ChatMessage>
          <ChatMessage1>
            <BotMessage>하............이거 맞냐?ㅠ</BotMessage>
          </ChatMessage1>
          <ChatMessage2>
            <BotMessage>재밌네..재밌네..@**으갸갸갸갸갸갹갹..</BotMessage>
          </ChatMessage2>
        </ChatBox>
        <MorePostsLink href="#" onClick={handleLiveClick}>
          개발자들의 아우성 들으러가기
        </MorePostsLink>
      </Body>
      {isModalOpen && (
        <LoginModal
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </Container>
  );
};

export default Mainpage;
