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
`;

const DropDownItem = styled.div`
  padding: 1vw;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
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
    { tagName: "swift", color: "#6630ff" },
    { tagName: "Ios", color: "#FF3F3F" },
    { tagName: "java", color: "#00A775" },
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
            onClick={() => {
              //드롭다운 제거(구현보류)
              setTags(tags.filter((t) => t.tagName !== tag.tagName));
            }}
          ></Tag>
        ))}
      </TagList>
    </>
  );
}
export default TagDropdown;
