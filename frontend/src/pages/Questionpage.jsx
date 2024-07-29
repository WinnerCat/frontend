import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/header';
import NoBugImage from '../img/no_bug.png';
import SearchIcon from '../img/search_icon.png';
import Round from "../img/Round.png";
import Done from "../img/done.png";
import ConversationDetail from '../components/ConversationDetail';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
`;

const Sidebar = styled.div`
  width: 15%;
  background-color: #f5f5f5;
  padding: 3vw;
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
  margin-bottom: 2vw;
`;

const SidebarTitle = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 800;
  font-size: 24px;
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
  font-size: 1.2vw;
  color: #000000;
`;

const SidebarTagList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  img {
    width: 50%;
    margin-bottom: 1vw;
  }
  p {
    font-size: 2vw;
    color: #d9d9d9;
  }
`;

const SearchBarContainer = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 2vw;
  padding: 0.3vw 2vw;
  position: absolute;
  bottom: 3vw;
  left: 50%;
  transform: translateX(-50%);
`;

const SearchInput = styled.input`
  border: none;
  flex: 1;
  padding: 0.5vw;
  border-radius: 16px;
  outline: none;
  font-size: 1vw;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5vw;
`;

const AdditionalText = styled.p`
  font-size: 0.9vw;
  text-align: center;
  border: none;
  text-decoration: underline;
  color: #808080;
  position: absolute;
  bottom: 0.5vw;
  left: 50%;
  transform: translateX(-50%);
`;

const Tag = ({ name, color, icon }) => {
  const Container = styled.div`
    display: flex;
    align-items: center;
    margin-left: 0.5vw;
    padding: 0.3vw 0.7vw;
    border-radius: 1.2vw;
    background: ${color};
    color: #fff;
    font-family: Pretendard;
    font-size: 1vw;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `;

  const Icon = styled.img`
    width: 0.45vw;
    height: 0.45vw;
    margin-left: 0.4vw;
  `;

  return (
    <Container>
      <span>{name}</span>
      <Icon src={icon} />
    </Container>
  );
};

const QuestionPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("토큰이 없습니다. 로그인을 해주세요.");
        return;
      }

      try {
        const response = await fetch("http://bugnyang.shop:8080/api/question-room", {
          method: "GET",
          headers: {
            "Authorization": token,
          },
        });

        const data = await response.json();
        console.log("Fetched questions data:", data);

        if (data.isSuccess) {
          const fetchedQuestions = data.result.map((item) => ({
            id: item.id,
            title: item.roomName,
            status: item.state === "PROGRESS" ? "해결중" : "해결완료",
            questionRoomId: item.id,
          }));

          setQuestions(fetchedQuestions);
        } else {
          alert("에러가 발생했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("에러가 발생했습니다. 다시 시도해주세요.");
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionClick = async (question) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("토큰이 없습니다. 로그인을 해주세요.");
      return;
    }
  
    console.log("Clicked question:", question);
  
    try {
      const response = await fetch(`http://bugnyang.shop:8080/api/question-room/${question.questionRoomId}`, {
        method: "GET",
        headers: {
          "Authorization": token,
        },
      });
  
      const data = await response.json();
      console.log("Fetched conversation data:", data);
  
      if (data.isSuccess) {
        const conversationData = {
          question: {
            id: question.questionRoomId,
            title: question.title,
            content: JSON.parse(data.result.questionList[0].content).question,
          },
          answers: data.result.answerList || []
        };
  
        localStorage.setItem('conversationData', JSON.stringify(conversationData));
        setSelectedQuestion(question);
      } else {
        alert("대화 내용을 불러오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("Error fetching conversation details:", error);
      alert("대화 내용을 불러오는데 실패했습니다.");
    }
  };
  

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <Sidebar>
          <SidebarHeader>
            <SidebarTitleContainer>
              <img src={Done} alt="Done" style={{ width: '24px', height: '24px' }} />
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
                  color={question.status === '해결중' ? '#6630FF' : '#808080'} 
                  icon={question.status === '해결중' ? Round : Done}
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
            />
          ) : (
            <NoBugFound>
              <img src={NoBugImage} alt="No bugs found" />
              <p>아무런 버그도 발견되지 않았어요</p>
            </NoBugFound>
          )}
          <SearchBarContainer>
            <SearchInput type="text" placeholder="어떤 에러가 발생 하였나요?" />
            <SearchButton>
              <img src={SearchIcon} alt="Search" />
            </SearchButton>
          </SearchBarContainer>
          <AdditionalText>답변 외 방법으로 해결하였습니다.</AdditionalText>
        </ContentArea>
      </MainContent>
    </PageContainer>
  );
};

export default QuestionPage;
