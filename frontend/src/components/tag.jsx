import styled from "styled-components";
import Round from "../img/Round.png";

const Container = styled.div`
  flex-shrink: 0;
  border-radius: 1.04vw;
  color: #fff;
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5vw;
  padding: 0.3vw 0.5vw 0.3vw 0.5vw;
`;

function Tag({ tagName, color }) {
  return (
    <>
      <Container style={{ background: color }}>
        <img
          src={Round}
          style={{
            width: "0.45vw",
            height: "0.45vw",
            marginRight: "0.4vw",
          }}
        ></img>
        <span>{tagName}</span>
      </Container>
    </>
  );
}

export default Tag;
