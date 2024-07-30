import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Union from "../img/Union.png";
import LogoImage from "../img/logo_main.png";
import ModalLogoImage from "../img/logo.png";

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
  font-weight: 800;
  cursor: pointer;

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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 3vw;
  border-radius: 1vw;
  text-align: center;
  width: 30vw;
`;

const ModalLogo = styled.img`
  width: 50%;
  margin-bottom: 2vw;
`;

const ModalTitle = styled.h2`
  font-size: 1.5vw;
  color: #000000;
  margin: 0;
`;

const ModalSubtitle = styled.p`
  font-size: 1vw;
  color: #808080;
  margin: 0.5vw 0 1vw 0;
`;

const ModalButton = styled.button`
  background-color: #6630FF;
  color: white;
  border: none;
  padding: 0.8vw 1vw;
  border-radius: 0.5vw;
  cursor: pointer;
  font-size: 1vw;
  margin: 1vw 0 1vw 0;
  width: 60%;

  &:hover {
    background-color: #4a25c1;
  }
`;

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const checkLogin = (e) => {
    e.preventDefault();
    console.log(localStorage.getItem('isLogined')); 
    if (localStorage.getItem('isLogined') === 'true') {
      const href = e.target.getAttribute('href');
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
    setIsDropdownOpen(prevState => !prevState);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.setItem('isLogined', 'false');
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <HeaderContainer>
      <LogoLink href="/">
        <Logo src={LogoImage} alt="버그냥이 로고" />
      </LogoLink>
      <Nav>
        <NavItem href="/" onClick={checkLogin}>홈</NavItem>
        <NavItem href="/allPost" onClick={checkLogin}>전체 게시판</NavItem>
        <NavItem href="/savePost" onClick={checkLogin}>저장게시판</NavItem>
        <NavItem href="/live" onClick={checkLogin}>실시간 아우성</NavItem>
        <NavItem href="/question" onClick={checkLogin}>질문 내역</NavItem>
      </Nav>
      <CatIcon onClick={checkLogin}>
        <img src={Union} alt="Union" />
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
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalLogo src={ModalLogoImage} alt="버그냥이 로고" />
            <ModalTitle>로그인하고 더 다양한 기능을 이용하세요!</ModalTitle>
            <ModalSubtitle>당신의 버그를 같이 해결 해줄게요!</ModalSubtitle>
            <ModalButton onClick={() => navigate('/login')}>로그인</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </HeaderContainer>
  );
};

export default Header;
