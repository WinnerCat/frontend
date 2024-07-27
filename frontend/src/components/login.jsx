import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
  padding: 2vw;
  width: 700px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormGroup = styled.div`
  margin: 2vw;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 90%;
  padding: 1.5vw;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #6603ff;
  color: white;
  border: none;
  padding: 1.3vw;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  width: 87%;
  
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

const Footer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 3vw;
  width: 100%;
`;

const Logo = styled.img`
  width: 25%;
  margin-bottom: 20px;
`;

const OrDivider = styled.div`
  margin: 1vw;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: #838383;
  div {
    flex: 1;
    height: 0.2vw;
    background-color: #ccc;
  }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (email === '' || password === '') {
      setError('이메일과 비밀번호를 모두 입력해 주세요.');
    } else {
      setError('');
      console.log('로그인 시도:', { email, password });
      
      const payload = {
        email,
        password,
      };

      try {
        const response = await axios.post('http://bugnyang.shop:8080/login', payload);
        console.log('로그인 성공:', response.data);

        if (response.data.isSuccess) {
          const token = response.data.result;

          localStorage.setItem('token', token);
          localStorage.setItem('email', email); 
          localStorage.setItem('logined', 'true');

        } else {
          setError('로그인에 실패했습니다. 다시 시도해 주세요.');
        }
      } catch (error) {
        console.error('로그인 실패:', error);
        setError('로그인에 실패했습니다. 다시 시도해 주세요.');
      }
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
                placeholder="이메일을 입력하세요."
                required
              />
              <Input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="비밀번호를 입력하세요."
                required
              />
            </FormGroup>
            {error && <Error>{error}</Error>}
            <Button type="submit">이메일로 로그인</Button>
            <Footer>
              <SecondaryButton>아이디/비밀번호 찾기</SecondaryButton>
              <SecondaryButton>회원가입</SecondaryButton>
            </Footer>
            <OrDivider>
              <div></div>-----간편로그인-----<div></div>
            </OrDivider>
            {/* <QuickLoginText>간편 로그인</QuickLoginText> */}
          </Form>
        </Container>
      </Body>
    </div>
  );
};

export default Login;
