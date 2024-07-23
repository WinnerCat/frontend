//header
// src/components/header.jsx
import React from 'react';
import styled from 'styled-components';
import Union from "../img/Union.png";
import SearchIconImg from "../img/searchicon.png";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: white;
  background-color: #6630FF;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left: 40px;
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
  font-size: 24px;
`;

const Header = () => (
  <HeaderContainer>
    <Logo>버그냥이ꗯ</Logo>
    <Nav>
      <NavItem href="#">전체게시판</NavItem>
      <NavItem href="#">실시간 아우성</NavItem>
      <NavItem href="#">저장게시판</NavItem>
      <NavItem href="#">홈</NavItem>
    </Nav>
    <CatIcon><img src={Union} alt="Union" /></CatIcon>
  </HeaderContainer>
);

export default Header;
