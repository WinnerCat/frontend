import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/header";
import LogoImage from "../img/logo.png";
import CheckIcon from "../img/check-icon.png";
import CharacterImage from "../img/bugcat.png";
import { useNavigate } from "react-router-dom";

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
  margin-top: 2vw;
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: #6200ea;
  padding: 3vw;
  border-radius: 10%;
  text-align: center;
  width: 500px;
  max-width: 80%;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalButton = styled.button`
  background-color: white;
  color: #6200ea;
  border: none;
  width: 80%;
  padding: 1.3vw 3vw;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 2vw;

  &:hover {
    background-color: #d3d3d3;
  }
`;

const CheckIconImage = styled.img`
  width: 15%;
  margin-bottom: 20px;
`;

const CharacterImageStyled = styled.img`
  width: 70%;
  margin-top: 20px;
`;

const Signup = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    if (value.length < 2 || value.length > 5) {
      setNicknameError("닉네임은 2~5글자로 제한됩니다.");
    } else {
      setNicknameError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("올바른 이메일 형식을 입력해 주세요.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nickname || !email || !password || !confirmPassword) {
      setNicknameError(!nickname ? "필수 입력 항목입니다!" : "");
      setEmailError(!email ? "필수 입력 항목입니다!" : "");
      setPasswordError(!password ? "필수 입력 항목입니다!" : "");
      setConfirmPasswordError(!confirmPassword ? "필수 입력 항목입니다!" : "");
      return;
    }

    if (nicknameError || emailError || passwordError || confirmPasswordError) {
      return;
    }

    const payload = {
      email,
      nickname,
      password,
      role: "ROLE_ADMIN",
      username: email,
    };

    try {
      const response = await axios.post("https://bugnyang.shop/join", payload);
      console.log("회원가입 성공:", response.data);

      if (response.data.isSuccess) {
        const loginPayload = {
          email,
          password,
        };

        const loginResponse = await axios.post(
          "http://bugnyang.shop:8080/login",
          loginPayload
        );
        console.log("로그인 성공:", loginResponse.data);

        if (loginResponse.data.isSuccess) {
          const token = loginResponse.data.result;

          localStorage.setItem("token", token);
          localStorage.setItem("isLogined", "true");

          setIsModalOpen(true);
        } else {
          setError("로그인에 실패했습니다. 다시 시도해 주세요.");
        }
      } else {
        setError("회원가입에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error("회원가입 또는 로그인 실패:", error);
      setError("회원가입 또는 로그인에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/");
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
                <Label htmlFor="nickname">
                  닉네임<RequiredAsterisk>*</RequiredAsterisk>
                </Label>
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
                <Label htmlFor="email">
                  이메일<RequiredAsterisk>*</RequiredAsterisk>
                </Label>
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
                <Label htmlFor="password">
                  비밀번호<RequiredAsterisk>*</RequiredAsterisk>
                </Label>
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
                <Label htmlFor="confirmPassword">
                  비밀번호 확인<RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <InputGroup>
                  <Input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder="비밀번호를 한번 더 입력하세요."
                    required
                  />
                  {confirmPasswordError && (
                    <Error>{confirmPasswordError}</Error>
                  )}
                </InputGroup>
              </FieldGroup>
            </FormGroup>
            {error && <Error>{error}</Error>}
            <Button type="submit">회원가입</Button>
          </Form>
        </Container>
      </Body>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <CheckIconImage src={CheckIcon} alt="체크 아이콘" />
            <h2>회원가입 완료!</h2>
            <p>버그냥이와 함께 지금부터 개발을 시작해보세요!</p>
            <CharacterImageStyled src={CharacterImage} alt="캐릭터 이미지" />
            <ModalButton onClick={closeModal}>버그 찾아보러 가기</ModalButton>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default Signup;
