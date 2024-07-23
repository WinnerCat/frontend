import styled from "styled-components";
import Round from "../img/Round.png";

const Container = styled.div`
  width: 3.9vw;
  height: 1.56vw;
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
`;

function Tag({ name, color }) {
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
        <span>{name}</span>
      </Container>
    </>
  );
}

export default Tag;
