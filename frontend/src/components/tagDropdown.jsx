import styled from "styled-components";
import React, { useState } from "react";
import Tag from "./tag";

import PolyGon from "../img/Polygon2.png";

const DropdownContainer = styled.div`
  position: relative;
  width: 24.8vw;
  height: 3.2vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownInput = styled.input`
  border: none;
  width: 24.8vw;
  font-size: 1vw;
`;
const DropdownButton = styled.div`
  cursor: pointer;
`;

const DropDownMenu = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  background-color: white;
  border: 0.05vw solid #ccc;
  border-radius: 0.8vw;
  margin-top: 0.5vw;
  width: 100%;
  z-index: 1;
  box-shadow: 0 0.4vw 0.8vw rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 24vw;
  top: 1.5vw;
  max-height: 15vw; /* 드롭다운 최대 높이를 설정 */
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 활성화 */
`;

const DropDownItem = styled.div`
  padding: 1vw;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #6630ff;
    color: white;
  }
`;

const TagList = styled.div`
  display: flex;
  margin-bottom: 3.7vw;
  gap: 0.5vw;
`;

function TagDropdown({ tags, setTags }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const availableTags = [
    { tagName: "JavaScript", color: "#F7DF1E" },
    { tagName: "Python", color: "#306998" },
    { tagName: "Java", color: "#5382A1" },
    { tagName: "C#", color: "#239120" },
    { tagName: "C/C++", color: "#00599C" },
    { tagName: "Swift", color: "#FA7343" },
    { tagName: "Kotlin", color: "#0095D5" },
    { tagName: "TypeScript", color: "#3178C6" },
    { tagName: "React", color: "#61DAFB" },
    { tagName: "Git", color: "#DD0031" },
    { tagName: "Vue.js", color: "#4FC08D" },
    { tagName: "Django", color: "#092E20" },
    { tagName: "Flask", color: "#000000" },
    { tagName: "Spring", color: "#6DB33F" },
    { tagName: "Express", color: "#000000" },
    { tagName: "NestJS", color: "#E0234E" },
    { tagName: "iOS", color: "#A2AAAD" },
    { tagName: "Android", color: "#3DDC84" },
    { tagName: "React Native", color: "#137CBD" },
    { tagName: "Flutter", color: "#02569B" },
    { tagName: "SQL", color: "#00758F" },
  ];

  const handleTagSelect = (tag) => {
    const isTagSelected = tags.some((t) => t.tagName === tag.tagName);
    if (!isTagSelected && tags.length < 5) {
      setTags([...tags, tag]);
      setShowDropdown(false);
    }
  };
  console.log(tags);
  return (
    <>
      <DropdownContainer onClick={() => setShowDropdown(!showDropdown)}>
        <DropdownInput placeholder="태그를 선택해 주세요. (최대 5개)"></DropdownInput>
        <DropdownButton>
          <img src={PolyGon} style={{ width: "1.4vw", height: "1.0vw" }} />
        </DropdownButton>
        <DropDownMenu show={showDropdown}>
          {availableTags.map((tag, index) => (
            <DropDownItem key={index} onClick={() => handleTagSelect(tag)}>
              {tag.tagName}
            </DropDownItem>
          ))}
        </DropDownMenu>
      </DropdownContainer>
      <TagList>
        {tags.map((tag, index) => (
          <Tag
            key={index}
            tagName={tag.tagName}
            color={tag.color}
            onClick={() =>
              setTags(tags.filter((t) => t.tagName !== tag.tagName))
            } // 태그 클릭 시 제거
          ></Tag>
        ))}
      </TagList>
    </>
  );
}
export default TagDropdown;
