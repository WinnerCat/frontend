import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/header";
import LogoImage from "../img/logo.png";
import google from "../img/google.png";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2vw;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Form = styled.form`
  background: white;
  border-radius: 1.5vw;
  box-shadow: 0 0.2vw 1vw rgba(0, 0, 0, 0.3);
  padding: 2vw;
  width: 70vw;
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
  border: 0.1vw solid #ccc;
  font-size: 1.3vw;
`;

const Button = styled.button`
  background-color: #6603ff;
  color: white;
  border: none;
  padding: 1.3vw;
  border-radius: 1vw;
  cursor: pointer;
  font-size: 1.5vw;
  width: 87%;

  &:hover {
    background-color: #0056b3;
  }
`;

const SecondaryButton = styled.button`
  background: none;
  border: none;
  color: #6c757d;
  font-size: 1.3vw;
  cursor: pointer;
  margin: 0 1vw;
  text-decoration: underline;
`;

const Error = styled.p`
  color: #d9534f;
  margin-top: 1vw;
  font-size: 1.2vw;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 3vw;
  width: 100%;
`;

const Logo = styled.img`
  width: 25%;
`;

const Google = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
  height: 2vw;
`;

const OrDivider = styled.div`
  display: flex;
  margin: 1vw;
  display: flex;
  align-items: center;
  font-size: 1.2vw;
  border-radius: 0.5vw;
  border: 0.05vw solid #000;
  padding: 0.5vw;
  cursor: pointer;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onGoogleLogin = () => {
    window.location.href = "https://bugnyang.shop/oauth2/authorization/google";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("이메일과 비밀번호를 모두 입력해 주세요.");
    } else {
      setError("");
      console.log("로그인 시도:", { email, password });

      const payload = {
        email,
        password,
      };

      try {
        const response = await axios.post(
          "https://bugnyang.shop/login",
          payload
        );
        console.log("로그인 성공:", response.data);

        if (response.data.isSuccess) {
          const token = response.data.result;

          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
          localStorage.setItem("isLogined", "true");

          navigate("/");
        } else {
          setError("로그인에 실패했습니다. 다시 시도해 주세요.");
        }
      } catch (error) {
        console.error("로그인 실패:", error);
        setError("로그인에 실패했습니다. 다시 시도해 주세요.");
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
              <SecondaryButton onClick={() => navigate("/signup")}>
                회원가입
              </SecondaryButton>
            </Footer>
            <OrDivider>
              <img
                src={google}
                style={{ width: "2vw", height: "2vw", borderRadius: "1.5vw" }}
              />
              <Google onClick={onGoogleLogin}>Google로 로그인</Google>
            </OrDivider>
          </Form>
        </Container>
      </Body>
    </div>
  );
};

export default Login;
