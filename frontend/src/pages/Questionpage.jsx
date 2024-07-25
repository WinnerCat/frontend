import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/header';
import NoBugImage from '../img/no_bug.png'; 
import SearchIcon from '../img/search_icon.png';
import Tag from '../components/tag'; //태그 새로 만들어야겟다..

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
`;

const SidebarHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2vw;
`;

const SidebarTitle = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 800;
  font-size: 24px;
  color: #000000;
  margin-bottom: 2vw;
`;

const SidebarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1vw;
  width: 100%;
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

const SidebarButton = styled.button`
  background-color: ${(props) => (props.active ? '#6630FF' : '#E0E0E0')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  border: none;
  padding: 1vw;
  border-radius: 4px;
  width: auto;
  cursor: pointer;
  font-size: 1vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2vw;
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
    width: 150px;
    margin-bottom: 1vw;
  }
  p {
    font-size: 1.2vw;
  }
`;

const SearchBarContainer = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 2vw;
  padding: 0.5vw 2vw;
  position: absolute;
  bottom: 2vw;
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

const QuestionList = styled.div`
  width: 70%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1vw;
`;

const QuestionItem = styled.div`
  background: #f9f9f9;
  border-radius: 4px;
  padding: 1vw;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5vw;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.5vw;
`;

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('해결중');

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      setQuestions([...questions, { title, content, status: selectedStatus }]);
      setTitle('');
      setContent('');
    }
  };

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <Sidebar>
          <SidebarHeader>
            <SidebarTitle>Trouble</SidebarTitle>
            <SidebarContent>
              <SidebarLabel>에러 제목 요약</SidebarLabel>
              <Tag name={selectedStatus} color={selectedStatus === '해결중' ? '#6630FF' : '#E0E0E0'} />
            </SidebarContent>
            <SidebarTagList>
              {questions.map((question, index) => (
                <SidebarContent key={index}>
                  <SidebarLabel>{question.title}</SidebarLabel>
                  <Tag name={question.status} color={question.status === '해결중' ? '#33C4FF' : '#FF5733'} />
                </SidebarContent>
              ))}
            </SidebarTagList>
          </SidebarHeader>
        </Sidebar>
        <ContentArea>
          {questions.length === 0 ? (
            <NoBugFound>
              <img src={NoBugImage} alt="No bugs found" />
              <p>아무런 버그도 발견되지 않았어요</p>
            </NoBugFound>
          ) : (
            <QuestionList>
              {questions.map((question, index) => (
                <QuestionItem key={index}>
                  <h2>{question.title}</h2>
                  <p>{question.content}</p>
                  <TagContainer>
                    <Tag name={question.status} color={question.status === '해결중' ? '#33C4FF' : '#FF5733'} />
                  </TagContainer>
                </QuestionItem>
              ))}
            </QuestionList>
          )}
          <SearchBarContainer>
            <SearchInput
              type="text"
              placeholder="어떤 에러가 발생 하였나요?"
            />
            <SearchButton>
              <img src={SearchIcon} alt="Search" />
            </SearchButton>
          </SearchBarContainer>
        </ContentArea>
      </MainContent>
    </PageContainer>
  );
};

export default QuestionPage;
