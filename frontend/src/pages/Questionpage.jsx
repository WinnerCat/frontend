import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/header';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2vw;
  width: 70%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1vw;
`;

const Input = styled.input`
  padding: 1vw;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 1vw;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  height: 200px;
`;

const Button = styled.button`
  background-color: #6630FF;
  color: white;
  border: none;
  padding: 1vw;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #5320CC;
  }
`;

const QuestionList = styled.div`
  margin-top: 2vw;
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
`;


const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      setQuestions([...questions, { title, content }]);
      setTitle('');
      setContent('');
    }
  };

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <h1>질문하기</h1>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextArea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <Button type="submit">질문 제출</Button>
        </Form>
        <QuestionList>
          {questions.map((question, index) => (
            <QuestionItem key={index}>
              <h2>{question.title}</h2>
              <p>{question.content}</p>
            </QuestionItem>
          ))}
        </QuestionList>
      </MainContent>
    </PageContainer>
  );
};

export default QuestionPage;