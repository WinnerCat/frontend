import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Union from "../img/Union.png";
import LogoImage from "../img/logo_main.png";
import LoginModal from "./Loginmodal"; // LoginModal 컴포넌트 import

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7vw 3vw;s
  color: white;
  background-color: #6630FF;
`;

const LogoLink = styled.a`
  width: 10%;
`;

const Logo = styled.img`
  width: 100%;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  flex: 1;
  gap: 1vw;
  margin-right: 10vw;
`;

const NavItem = styled.a`
  margin: 0 2vw;
  text-decoration: none;
  color: white;
  font-size: 1.2vw;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CatIcon = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 0.1vw solid #ccc;
  border-radius: 1.5vw;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 0.2vw 1vw rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.a`
  display: block;
  padding: 1vw 1.5vw;
  color: #333;
  font-size: 1.2vw;
  text-decoration: none;
  white-space: nowrap;
  border-bottom: 0.1vw solid #e0e0e0;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const checkLogin = (e) => {
    e.preventDefault();
    console.log(localStorage.getItem("isLogined"));
    if (localStorage.getItem("isLogined") === "true") {
      const href = e.target.getAttribute("href");
      if (href) {
        navigate(href);
      } else {
        toggleDropdown();
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.setItem("isLogined", "false");
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <HeaderContainer>
      <LogoLink href="/">
        <Logo src={LogoImage} alt="버그냥이 로고" />
      </LogoLink>
      <Nav>
        <NavItem href="/" onClick={checkLogin}>
          {" "}
          홈{" "}
        </NavItem>
        <NavItem href="/allPost" onClick={checkLogin}>
          전체 게시판
        </NavItem>
        <NavItem href="/savePost" onClick={checkLogin}>
          저장게시판
        </NavItem>
        <NavItem href="/live" onClick={checkLogin}>
          실시간 아우성
        </NavItem>
        <NavItem href="/question" onClick={checkLogin}>
          질문 내역
        </NavItem>
      </Nav>
      <CatIcon onClick={checkLogin}>
        <img
          src={Union}
          style={{ width: "2.5vw", height: "2.5vw" }}
          alt="Union"
        />
        {isDropdownOpen && (
          <DropdownMenu>
            <DropdownItem href="/myPost">내 게시판</DropdownItem>
            <DropdownItem href="/savePost">저장 게시판</DropdownItem>
            <DropdownItem href="/profile">내 정보</DropdownItem>
            <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
          </DropdownMenu>
        )}
      </CatIcon>
      {isModalOpen && (
        <LoginModal isModalOpen={isModalOpen} closeModal={closeModal} />
      )}
    </HeaderContainer>
  );
};

export default Header;
