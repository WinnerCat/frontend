import styled from "styled-components";
import PolyGon from "../img/Polygon2.png";

const DropdownContainer = styled.div`
  width: 24.8vw;
  height: 3.2vw;
  margin-bottom: 3.7vw;
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

function TagDropdown({ tags, setTags }) {
  return (
    <>
      <DropdownContainer>
        <DropdownInput placeholder="태그를 선택해 주세요. (최대 5개)"></DropdownInput>
        <DropdownButton>
          <img src={PolyGon} style={{ width: "1.4vw", height: "1.0vw" }} />
        </DropdownButton>
      </DropdownContainer>
    </>
  );
}

export default TagDropdown;
