import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/header";
import Rectangle from "../../img/Rectangle.png";
import Modal from "../../components/modal";
import TagDropdown from "../../components/tagDropdown";
import SuccessModal from "../../components/successModal";
import { useNavigate } from "react-router-dom";
import Config from "../../config/config";

const Title = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 1.6vw;
  font-style: normal;
  font-weight: 600;
  line-height: 175%; /* 56px */
  margin-bottom: 1.6vw;
`;

const ColorTitle = styled.span`
  color: var(--6630FF, #6630ff);
  font-family: Pretendard;
  font-size: 1.6vw;
  font-style: normal;
  font-weight: 600;
  line-height: 175%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6.75vw;
  flex-direction: column;
`;

const Container80 = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const InputContainerTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 1.2vw;
  font-style: normal;
  font-weight: 600;
  line-height: 175%; /* 42px */
  margin-bottom: 0.5vw;
`;

const Input = styled.input`
  width: 100%;
  height: 3vw;
  flex-shrink: 0;
  border-radius: 0.8vw;
  border: 0.05vw solid #000;
  margin-bottom: 1.95vw;
  padding: 0.5vw;
  color: #000;
  font-family: Inter;
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  line-height: 200%; /* 40px */
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 10vw;
  flex-shrink: 0;
  border-radius: 0.8vw;
  border: 0.05vw solid #000;
  margin-bottom: 1.95vw;
  padding: 0.5vw;
  color: #000;
  font-family: Inter;
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  line-height: 200%; /* 40px */
  resize: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CancelButton = styled.div`
  width: 5.7vw;
  height: 3.15vw;
  flex-shrink: 0;
  border-radius: 0.8vw;
  background: var(--E8F0FF, #e8f0ff);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SaveButton = styled.div`
  width: 5.7vw;
  height: 3.15vw;
  flex-shrink: 0;
  border-radius: 0.8vw;
  background: var(--6630FF, #6630ff);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1.5vw;
  cursor: pointer;
`;

const ButtonContainer1 = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10vw;
`;

function PostCreate() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const openModal1 = () => setIsModalOpen1(true);
  const closeModal1 = () => {
    setIsModalOpen1(false);
    navigate("/myPost");
  };

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [cause, setCause] = useState("");
  const [solution, setSolution] = useState("");

  // useEffect를 사용하여 로컬스토리지에서 값을 불러와 초기 상태 설정
  useEffect(() => {
    const storedTitle = localStorage.getItem("title");
    const storedAnswer = localStorage.getItem("answer");

    if (storedTitle) {
      setTitle(storedTitle);
    }

    if (storedAnswer) {
      setSolution(storedAnswer);
    }

    // 컴포넌트가 마운트되고 나면 로컬스토리지에서 값을 지움
    return () => {
      localStorage.removeItem("title");
      localStorage.removeItem("answer");
    };
  }, []);

  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handleCauseChange = (value) => {
    setCause(value);
  };

  const handleSolutionChange = (value) => {
    setSolution(value);
  };

  // 통신코드
  const token = localStorage.getItem("token");

  const handleCreate = async () => {
    if (!title || tags.length === 0 || !cause || !solution) {
      alert("모든 항목을 채워주세요.");
      return;
    }
    try {
      const response = await fetch(`${Config.baseURL}/api/article`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          title: title,
          tags: tags.map((tag) => tag.tagName),
          cause: cause,
          solution: solution,
        }),
      });

      const data = await response.json();
      console.log(data);
      console.log(tags);

      if (response.status === 200) {
        openModal1();
        setTimeout(() => {
          navigate("/myPost");
        }, 2000); // 2000ms = 2초
      } else {
        alert("오류발생");
      }
    } catch (error) {
      alert("에러발생");
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Container80>
          <Title>
            <ColorTitle>버그냥이 </ColorTitle>덕분에
            <br></br>
            이런 부분을 <ColorTitle>해결</ColorTitle>했어요!
            <img
              src={Rectangle}
              style={{ width: "3vw", height: "3vw", marginLeft: "1.7vw" }}
            />
          </Title>
          <InputContainerTitle>제목</InputContainerTitle>
          <Input
            placeholder="제목을 작성 해주세요."
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
          <InputContainerTitle>태그</InputContainerTitle>
          <TagDropdown tags={tags} setTags={setTags} />
          <InputContainerTitle>원인</InputContainerTitle>
          <TextArea
            placeholder="내용을 작성 해주세요."
            value={cause}
            onChange={(e) => handleCauseChange(e.target.value)}
          />
          <InputContainerTitle>해결방법</InputContainerTitle>
          <TextArea
            placeholder="내용을 작성 해주세요."
            value={solution}
            onChange={(e) => handleSolutionChange(e.target.value)}
          />
          <ButtonContainer1>
            <ButtonContainer>
              <CancelButton onClick={openModal}>
                <span
                  style={{
                    color: "#000",
                    fontFamily: "Pretendard",
                    fontSize: "1vw",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "175%",
                  }}
                >
                  취소
                </span>
              </CancelButton>
              <SaveButton
                onClick={() => {
                  handleCreate();
                }}
              >
                <span
                  style={{
                    color: "#FFF",
                    fontFamily: "Pretendard",
                    fontSize: "1vw",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "175%",
                  }}
                >
                  저장
                </span>
              </SaveButton>
              <SuccessModal isOpen={isModalOpen1} closeModal={closeModal1} />
              <Modal
                isOpen={isModalOpen}
                closeModal={closeModal}
                title="정말 글을 적지 않고 떠나실건가요?"
              />
            </ButtonContainer>
          </ButtonContainer1>
        </Container80>
      </Container>
    </>
  );
}

export default PostCreate;
