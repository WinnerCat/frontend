import React, { useState } from 'react';
import styled from 'styled-components';
import Union from "../img/Union.png";
import LogoImage from "../img/logo_main.png";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7vw 3vw;
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

  &:hover {
    text-decoration: underline;
  }
`;

const CatIcon = styled.div`
  position: relative;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 1vw;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.a`
  display: block;
  padding: 10px 20px;
  color: #333;
  text-decoration: none;
  white-space: nowrap;
  border-bottom: 1px solid #e0e0e0;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <HeaderContainer>
      <LogoLink href="/">
        <Logo src={LogoImage} alt="버그냥이 로고" />
      </LogoLink>
      <Nav>
        <NavItem href="#">홈</NavItem>
        <NavItem href="#">전체 게시판</NavItem>
        <NavItem href="#">저장게시판</NavItem>
        <NavItem href="#">실시간 아우성</NavItem>
        <NavItem href="#">질문 내역</NavItem>
      </Nav>
      <CatIcon onClick={toggleDropdown}>
        <img src={Union} alt="Union" />
        {isDropdownOpen && (
          <DropdownMenu>
            <DropdownItem href="#">내 게시판</DropdownItem>
            <DropdownItem href="#">저장 게시판</DropdownItem>
            <DropdownItem href="#">내 정보</DropdownItem>
            <DropdownItem href="#">로그아웃</DropdownItem>
          </DropdownMenu>
        )}
      </CatIcon>
    </HeaderContainer>
  );
};

export default Header;
