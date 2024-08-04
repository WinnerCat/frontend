import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/header";
import NoBugImage from "../img/no_bug.png";
import Round from "../img/Round.png";
import Done from "../img/done.png";
import Solved from "../img/Solved.png";
import SearchIconImg from "../img/searchicon.png";
import ConversationDetail from "../components/ConversationDetail";
import { useNavigate, useLocation } from "react-router-dom";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
`;

const Sidebar = styled.div`
  width: 15%;
  background-color: #f5f5f5;
  padding: 1vw 1vw 1vw 2vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SidebarHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2vw;
`;

const SidebarTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2vw;
`;

const SidebarTitle = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 800;
  font-size: 2vw;
  color: #000000;
  margin-left: 1vw;
`;

const SidebarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1vw;
  width: 100%;
  cursor: pointer;
`;

const SidebarLabel = styled.div`
  font-size: 1vw;
  color: #000000;
  width: 9vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SidebarTagList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
`;

const ContentArea = styled.div`
  flex: 1;
  position: relative;
  background-color: white;
`;

const NoBugFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #838383;
  text-align: center;
  margin-top: 20vw;
  img {
    width: 10%;
    margin-bottom: 1vw;
  }
  p {
    font-size: 2vw;
    color: #d9d9d9;
  }
`;

const SearchContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 20vw;
`;

const SearchInput = styled.input`
  font-size: 1.3vw;
  border: 1px solid #ccc;
  border-radius: 50px;
  width: 50vw;
  height: 3vh;
  padding: 1vw 3vw;
  color: black;
  background-color: white;

  &::placeholder {
    color: #808080;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 16px;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15vw;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const Tag = ({ name, color, icon, solvedIcon }) => {
  const Container = styled.div`
    display: flex;
    align-items: center;
    width: auto;
    max-width: 6vw;
    padding: 0.3vw 0.5vw;
    border-radius: 1.2vw;
    background: ${color};
    color: #fff;
    font-family: Pretendard;
    font-size: 1vw;
    font-style: normal;
    line-height: normal;
    white-space: nowrap;
    //overflow: hidden;
    text-overflow: ellipsis;
  `;

  const Icon = styled.img`
    width: 0.6vw;
    height: 0.6vw;
    margin-left: 0.4vw;
  `;

  const SolvedIcon = styled.img`
    width: 0.8vw;
    height: 0.8vw;
    margin-left: 0.2vw;
  `;

  return (
    <Container>
      <span>{name}</span>
      {name === "해결중" && <Icon src={icon} />}
      {name === "해결완료" && <SolvedIcon src={solvedIcon} />}
    </Container>
  );
};

const QuestionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("토큰이 없습니다. 로그인을 해주세요.");
        return;
      }

      try {
        console.log("질문 데이터를 가져오는 중...");

        const response = await fetch(
          "https://bugnyang.shop/api/question-room",
          {
            method: "GET",
            headers: {
              Authorization: token
            }
          }
        );

        const data = await response.json();
        console.log("가져온 질문 데이터:", data);

        if (data.isSuccess) {
          const fetchedQuestions = data.result
            .map((item) => ({
              id: item.id,
              title: item.roomName,
              status: item.state === "PROGRESS" ? "해결중" : "해결완료",
              questionRoomId: item.id
            }))
            .sort((a, b) => b.id - a.id); // id 기준 내림차순 정렬

          setQuestions(fetchedQuestions);

          // URL의 쿼리 파라미터를 확인하여 자동 선택 로직을 제어합니다.
          const queryParams = new URLSearchParams(location.search);
          if (queryParams.has("query")) {
            // 페이지 렌더링 시 가장 최신 질문 자동 선택
            if (fetchedQuestions.length > 0) {
              handleQuestionClick(fetchedQuestions[0]);
            }
          }
        } else {
          alert("에러가 발생했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("질문 데이터를 가져오는 중 에러 발생:", error);
        alert("에러가 발생했습니다. 다시 시도해주세요.");
      }
    };

    fetchQuestions();
  }, [location.search]); // URL 쿼리 파라미터 변경 시에도 다시 실행되도록 dependency 추가

  const handleQuestionClick = async (question) => {
    localStorage.setItem("questionRoomId", question.questionRoomId);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("토큰이 없습니다. 로그인을 해주세요.");
      return;
    }

    console.log("클릭한 질문:", question);

    try {
      const response = await fetch(
        `https://bugnyang.shop/api/question-room/${question.questionRoomId}`,
        {
          method: "GET",
          headers: {
            Authorization: token
          }
        }
      );

      const textResponse = await response.text();
      let data;
      try {
        data = JSON.parse(textResponse);
      } catch (error) {
        console.error("JSON 파싱 에러:", error);
        console.error("받은 응답:", textResponse);
        alert("서버에서 잘못된 응답을 받았습니다.");
        return;
      }

      console.log("가져온 대화 데이터:", data);

      if (data.isSuccess) {
        const questionContentList = data.result.questionList.map(
          (q) => q.content
        );
        const answerList = data.result.answerList.map((answer) => ({
          id: answer.answerId,
          content: answer.content,
          createdAt: answer.createdAt
        }));

        const conversationData = {
          questionList: questionContentList,
          answerList: answerList
        };

        localStorage.setItem(
          "conversationData",
          JSON.stringify(conversationData)
        );
        setSelectedQuestion(question);
      } else {
        alert("대화 내용을 불러오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("대화 내용을 가져오는 중 에러 발생:", error);
      alert("대화 내용을 불러오는데 실패했습니다.");
    }
  };

  // 검색 입력값 변화
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 검색 제출
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

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
  };

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <Sidebar>
          <SidebarHeader>
            <SidebarTitleContainer>
              <img
                src={Done}
                alt="Done"
                style={{ width: "1.8vw", height: "1.8vw" }}
              />
              <SidebarTitle>Trouble</SidebarTitle>
            </SidebarTitleContainer>
          </SidebarHeader>
          <SidebarTagList>
            {questions.map((question, index) => (
              <SidebarContent
                key={index}
                onClick={() => handleQuestionClick(question)}
              >
                <SidebarLabel>{question.title}</SidebarLabel>
                <Tag
                  name={question.status}
                  color={question.status === "해결중" ? "#6630FF" : "#808080"}
                  icon={question.status === "해결중" ? Round : Done}
                  solvedIcon={Solved}
                />
              </SidebarContent>
            ))}
          </SidebarTagList>
        </Sidebar>
        <ContentArea>
          {selectedQuestion ? (
            <ConversationDetail
              title={selectedQuestion.title}
              content={selectedQuestion.content}
              close={() => setSelectedQuestion(null)}
              articleId={selectedQuestion.id}
            />
          ) : (
            <>
              <NoBugFound>
                <img src={NoBugImage} alt="No bugs found" />
                <p>아무런 버그도 발견되지 않았어요</p>
              </NoBugFound>
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
            </>
          )}
        </ContentArea>
      </MainContent>
    </PageContainer>
  );
};

export default QuestionPage;
