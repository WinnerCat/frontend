import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/header";
import Rectangle from "../../img/Rectangle.png";
import Update from "../../img/update.png";
import Save from "../../img/Frame.png";
import Tag from "../../components/tag";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Container80 = styled.div`
  width: 80%;
`;

const BackButton = styled.div`
  width: 6.05vw;
  color: var(--d-9-d-9-d-9, #000);
  font-family: Inter;
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  line-height: 200%; /* 40px */
  margin-top: 3.5vw;
  margin-bottom: 3.15vw;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleLogo = styled.div`
  display: flex;
  align-items: center;
  color: var(--d-9-d-9-d-9, #000);
  font-family: Inter;
  font-size: 1.6vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 1.9vw;
`;

const SaveDelete = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4vw;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.5vw;
  margin-bottom: 6.9vw;
`;

const InputContainerTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 1.2vw;
  font-style: normal;
  font-weight: 600;
  line-height: 175%; /* 42px */
`;

const InputContainer = styled.input`
  width: 100%;
  height: 13vw;
  flex-shrink: 0;
  border-radius: 0.8vw;
  border: 0.05vw solid #000;
  margin-bottom: 1.95vw;
  color: var(--d-9-d-9-d-9, #000);
  font-family: Inter;
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  line-height: 200%; /* 40px */
`;

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Menu = styled.div`
  position: absolute;
  left: -10vw;
  top: 0;
  background-color: white;
  border: 0.05vw solid #ddd;
  border-radius: 0.8vw;
  box-shadow: 0 0 0.8vw 0 rgba(0, 0, 0, 0.25);
  z-index: 10;
  width: 10vw;
`;

const MenuItem = styled.div`
  padding: 1vw;
  text-align: center;
  color: #000;
  font-family: Inter;
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Divider = styled.div`
  height: 0.05vw;
  background-color: #ddd;
`;

function PostDetail() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <>
      <Header></Header>
      <Container>
        <Container80>
          <BackButton>&lt; 나의 작성글</BackButton>
          <TitleContainer>
            <TitleLogo>
              <img
                src={Rectangle}
                style={{ width: "3vw", height: "3vw", marginRight: "0.7vw" }}
                alt="Logo"
              />{" "}
              <span>Index out of range</span>
            </TitleLogo>
            <SaveDelete>
              <MenuContainer>
                <img
                  src={Update}
                  style={{ width: "2.4vw", height: "2.4vw", cursor: "pointer" }}
                  onClick={toggleMenu}
                  alt="Update"
                />
                {menuVisible && (
                  <Menu>
                    <MenuItem>수정하기</MenuItem>
                    <Divider />
                    <MenuItem>삭제하기</MenuItem>
                  </Menu>
                )}
              </MenuContainer>
              <img
                src={Save}
                style={{ width: "2.4vw", height: "2.4vw" }}
                alt="Save"
              />
            </SaveDelete>
          </TitleContainer>
          <TagContainer>
            <Tag name="Swift" color="#6630ff" />
            <Tag name="Swift" color="#ff3030" />
          </TagContainer>
          <InputContainerTitle>원인</InputContainerTitle>
          <InputContainer></InputContainer>
          <InputContainerTitle>해결방법</InputContainerTitle>
          <InputContainer style={{ marginBottom: "5.3vw" }}></InputContainer>
        </Container80>
      </Container>
      <hr></hr>
    </>
  );
}

export default PostDetail;
