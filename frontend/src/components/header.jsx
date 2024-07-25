import React, { useState } from 'react';
import styled from 'styled-components';
import Union from "../img/Union.png";
import LogoImage from "../img/logo_main.png";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: white;
  background-color: #6630FF;
`;

const Logo = styled.img`
  width: 15%;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  flex: 1;
  gap: 3vw;
  margin-right: 10vw;
`;

const NavItem = styled.a`
  margin: 0 15px;
  text-decoration: none;
  color: white;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;

const CatIcon = styled.div`
  position: relative;
  font-size: 20px;
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
      <Logo src={LogoImage} alt="버그냥이 로고" />
      <Nav>
        <NavItem href="#">전체게시판</NavItem>
        <NavItem href="#">실시간 아우성</NavItem>
        <NavItem href="#">저장게시판</NavItem>
        <NavItem href="#">홈</NavItem>
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
