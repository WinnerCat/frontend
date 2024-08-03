import styled from "styled-components";
import PolyGon from "../../img/Polygon.png";
import Tag from "../../components/tag";
import Header from "../../components/header";
import { useState, useEffect } from "react";
import Config from "../../config/config";
import { useNavigate } from "react-router-dom";

const Title = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 1.6vw;
  font-style: normal;
  font-weight: 600;
  line-height: 175%; /* 56px */
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
`;

const DropDownContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2.45vw;
`;

const DropDownButton = styled.div`
  width: 8vw;
  height: 1.8vw;
  flex-shrink: 0;
  border-radius: 0.8vw;
  background: var(--6630FF, #6630ff);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Stack = styled.span`
  color: #fff;
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Post = styled.div`
  width: 77%;
  flex-shrink: 0;
  border-radius: 0.8vw;
  border: 0.05vw solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6vw;
  margin-bottom: 1.1vw;
  cursor: pointer;
`;

const PostContainer = styled.div`
  display: flex;
`;

const Page = styled.div`
  color: var(--808080, #808080);
  font-family: Pretendard;
  font-size: 1.2vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const PageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1vw;
  margin: 0 0.5vw;
`;

const PostTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 1.2vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const DropDownItem = styled.div`
  padding: 0.8vw 1vw;
  display: flex;
  align-items: center;
  color: #f0f0f0;
  width: 100%;
  height: 2vw;

  cursor: pointer;
  background-color: white;
  color: black;
  font-size: 1.3vw;
  transition: background-color 0.3s ease, color 0.3s ease;
  border: 0.05vw solid #f0f0f0;

  &:hover {
    background-color: #6630ff;
    color: white;
  }
`;

const DropDownContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};

  position: relative;
  right: 14vw;
  top: 6.7vw;
  border-radius: 1vw;
  width: 17vw;
  box-shadow: 0 0.4vw 0.8vw rgba(0, 0, 0, 0.2);
  z-index: 1;
  max-height: 15vw;
  overflow-y: auto;
`;

function AllPost() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTag, setSelectedTag] = useState("전체보기");
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 전체보기 시 전체보기 API 태그 선택시 태그 API 사용
        const url =
          selectedTag === "전체보기"
            ? `${Config.baseURL}/api/article/all?page=${currentPage}&size=5`
            : `${Config.baseURL}/api/article/tag?tagName=${selectedTag}&page=${currentPage}&size=5`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
          setData(data.result.articlePreviewList);
          setTotalPages(data.result.totalPages);
        } else {
          alert("데이터를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        alert("에러 발생");
        console.log(error);
      }
    };

    fetchData();
  }, [token, currentPage, selectedTag]);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(0);
  };

  return (
    <>
      <Header></Header>
      <Container>
        <Container80>
          <Title>
            정보 글을 <ColorTitle>작성</ColorTitle>하여 <br></br>
            <ColorTitle>여러 개발자들</ColorTitle>과 소통해보세요!
          </Title>
        </Container80>
        <DropDownContainer>
          <DropDownButton onClick={() => setIsOpen(!isOpen)}>
            <Stack>
              {selectedTag}
              <img
                src={PolyGon}
                style={{ width: "1vw", height: "1vw", marginLeft: "0.35vw" }}
              />
              <DropDownContent isOpen={isOpen}>
                <DropDownItem onClick={() => handleTagChange("전체보기")}>
                  전체보기
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("JavaScript")}>
                  JavaScript
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("Python")}>
                  Python
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("Java")}>
                  Java
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("C#")}>
                  C#
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("C/C++")}>
                  C/C++
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("Swift")}>
                  Swift
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("Kotlin")}>
                  Kotlin
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("TypeScript")}>
                  TypeScript
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("React")}>
                  React
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("Angular")}>
                  Angular
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("Vue.js")}>
                  Vue.js
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("Django")}>
                  Django
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("Flask")}>
                  Flask
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("Spring")}>
                  Spring
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("Express")}>
                  Express
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("NestJS")}>
                  NestJS
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("iOS")}>
                  iOS
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("Android")}>
                  Android
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("React Native")}>
                  React Native
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("Flutter")}>
                  Flutter
                </DropDownItem>
                <DropDownItem onClick={() => handleTagChange("SQL")}>
                  SQL
                </DropDownItem>
              </DropDownContent>
            </Stack>
          </DropDownButton>
        </DropDownContainer>
        {data.map((article, index) => (
          <Post
            key={index}
            onClick={() => navigate(`/postDetail/${article.articleId}`)}
          >
            <PostTitle>{article.title}</PostTitle>
            <PostContainer>
              {article.tagList.map((tag, tagIndex) => (
                <Tag
                  key={tagIndex}
                  tagName={tag.tagName}
                  color={tag.colorCode}
                />
              ))}
            </PostContainer>
          </Post>
        ))}
        <Page>
          <PageButton onClick={handlePreviousPage} disabled={currentPage === 0}>
            &lt;
          </PageButton>
          {currentPage + 1}/{totalPages}
          <PageButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            &gt;
          </PageButton>
        </Page>
      </Container>
    </>
  );
}
//푸쉬
export default AllPost;
