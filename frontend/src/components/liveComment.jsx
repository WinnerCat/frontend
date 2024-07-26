import React, { useState } from "react";
import styled from "styled-components";

const CommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  width: 90%;
  font-family: Inter;
  font-size: 1.4vw;
  font-style: normal;
  font-weight: 700;
  line-height: 220%; /* 48.4px */
`;

const Time = styled.div`
  font-family: Inter;
  font-size: 1vw;
  font-style: normal;
  font-weight: 700;
  line-height: 220%; /* 48.4px */
`;

function LiveComment({ content, time }) {
  return (
    <>
      <CommentContainer>
        <Content>{content}</Content>
        <Time>{time}</Time>
      </CommentContainer>
    </>
  );
}

export default LiveComment;
