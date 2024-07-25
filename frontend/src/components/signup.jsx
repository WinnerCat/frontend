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
  padding: 2vw;
  width: 700px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 60%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
  position: relative;
`;

const RequiredAsterisk = styled.span`
  color: #d9534f;
  position: absolute;
  right: 2;
  top: 0;
  font-size: 18px;
  line-height: 1;
`;

const Input = styled.input`
  width: 80%;
  padding: 1.5vw;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #808080;
  color: white;
  border: none;
  padding: 1.5vw;
  border-radius: 15px;
  cursor: pointer;
  font-size: 16px;
  width: 80%;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const Error = styled.p`
  color: #d9534f;
  margin-top: 10px;
  font-size: 14px;
`;

const Logo = styled.img`
  width: 25%;
  margin-bottom: 20px;
`;

const FieldGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;
`;

const Signup = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (nickname === '' || email === '' || password === '' || confirmPassword === '') {
      setError('모든 필드를 입력해 주세요.');
    } else if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
    } else {
      setError('');
      console.log('회원가입 시도:', { nickname, email, password });
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
              <FieldGroup>
                <Label htmlFor="nickname">닉네임<RequiredAsterisk>*</RequiredAsterisk></Label>
                <Input
                  type="text"
                  id="nickname"
                  value={nickname}
                  onChange={handleNicknameChange}
                  placeholder="닉네임을 입력하세요."
                  required
                />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="email">이메일<RequiredAsterisk>*</RequiredAsterisk></Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="이메일을 입력하세요."
                  required
                />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="password">비밀번호<RequiredAsterisk>*</RequiredAsterisk></Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="비밀번호를 입력하세요."
                  required
                />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="confirmPassword">비밀번호 확인<RequiredAsterisk>*</RequiredAsterisk></Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="비밀번호 확인"
                  required
                />
              </FieldGroup>
            </FormGroup>
            {error && <Error>{error}</Error>}
            <Button type="submit">회원가입</Button>
          </Form>
        </Container>
      </Body>
    </div>
  );
};

export default Signup;
