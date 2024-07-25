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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vw;
  margin-top:2vw;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
  position: relative;
  width: 30%;
`;

const RequiredAsterisk = styled.span`
  color: #d9534f;
  position: absolute;
  top: 0;
  font-size: 18px;
  line-height: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 1vw 1.5vw;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #808080;
  color: white;
  border: none;
  padding: 1.3vw;
  margin: 3vw 0 2vw 0;
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
  margin-top: 5px;
  font-size: 14px;
`;

const Logo = styled.img`
  width: 25%;
  margin-bottom: 20px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  align-items: center;
  gap: 2vw;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const Signup = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    if (value.length < 2 || value.length > 5) {
      setNicknameError('닉네임은 2~5글자로 제한됩니다.');
    } else {
      setNicknameError('');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('올바른 이메일 형식을 입력해 주세요.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nickname || !email || !password || !confirmPassword) {
      setNicknameError(!nickname ? '필수 입력 항목입니다!' : '');
      setEmailError(!email ? '필수 입력 항목입니다!' : '');
      setPasswordError(!password ? '필수 입력 항목입니다!' : '');
      setConfirmPasswordError(!confirmPassword ? '필수 입력 항목입니다!' : '');
      return;
    }

    if (nicknameError || emailError || passwordError || confirmPasswordError) {
      return;
    }

    console.log('회원가입 시도:', { nickname, email, password });
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
                <InputGroup>
                  <Input
                    type="text"
                    id="nickname"
                    value={nickname}
                    onChange={handleNicknameChange}
                    placeholder="닉네임을 입력하세요."
                    required
                  />
                  {nicknameError && <Error>{nicknameError}</Error>}
                </InputGroup>
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="email">이메일<RequiredAsterisk>*</RequiredAsterisk></Label>
                <InputGroup>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="이메일을 입력하세요."
                    required
                  />
                  {emailError && <Error>{emailError}</Error>}
                </InputGroup>
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="password">비밀번호<RequiredAsterisk>*</RequiredAsterisk></Label>
                <InputGroup>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="비밀번호를 입력하세요."
                    required
                  />
                  {passwordError && <Error>{passwordError}</Error>}
                </InputGroup>
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="confirmPassword">비밀번호 확인<RequiredAsterisk>*</RequiredAsterisk></Label>
                <InputGroup>
                  <Input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder="비밀번호를 한번 더 입력하세요."
                    required
                  />
                  {confirmPasswordError && <Error>{confirmPasswordError}</Error>}
                </InputGroup>
              </FieldGroup>
            </FormGroup>
            <Button type="submit">회원가입</Button>
          </Form>
        </Container>
      </Body>
    </div>
  );
};

export default Signup;
