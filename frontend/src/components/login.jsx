import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/header';
import LogoImage from "../img/logo.png";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Form = styled.form`
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  width: 700px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.5vw;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #6603ff;
  color: white;
  border: none;
  padding: 1.5vw;
  border-radius: 16px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const SecondaryButton = styled.button`
  background: none;
  border: none;
  color: #6c757d;
  font-size: 14px;
  cursor: pointer;
  margin: 0 10px;
  text-decoration: underline;
`;

const Error = styled.p`
  color: #d9534f;
  margin-top: 10px;
  font-size: 14px;
`;

const QuickLoginButton = styled.button`
  border: none;
  border-radius: 4px;
  padding: 10px;
  margin-top: 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #d4d4d4;
  }
`;

const QuickLoginText = styled.div`
  margin-right: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 15px;
  width: 100%;
`;

const Logo = styled.img`
  width: 25%;
  margin-bottom: 20px;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email === '' || password === '') {
      setError('이메일과 비밀번호를 모두 입력해 주세요.');
    } else {
      setError('');
      console.log('로그인 시도:', { email, password });
    }
  };

  return (
    <div>
      <Header />
      <Body>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Logo src={LogoImage} alt="버그냥이 로고" />
            <FormGroup>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일을 입력하세요"
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </FormGroup>
            {error && <Error>{error}</Error>}
            <Button type="submit">이메일로 로그인</Button>
            <Footer>
              <SecondaryButton>아이디/비밀번호 찾기</SecondaryButton>
              <SecondaryButton>회원가입</SecondaryButton>
            </Footer>
            <QuickLoginButton>
              <QuickLoginText>간편 로그인</QuickLoginText>
              <img src="../img/quick-login-icon.png" alt="간편 로그인 아이콘" />
            </QuickLoginButton>
          </Form>
        </Container>
      </Body>
    </div>
  );
};

export default Login;
