import styled from "styled-components";
import PolyGon from "../../img/Polygon.png";
import Tag from "../../components/tag";
import Header from "../../components/header";
import { useState, useEffect } from "react";
import Config from "../../config/config";

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

const PostTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 1.2vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

function AllPost() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Config.baseURL}/api/article/all?page=0&size=5`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
          setData(data.result.articlePreviewList);
        } else {
          alert("데이터를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        alert("에러 발생");
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      <Header></Header>
      <Container>
        <Container80>
          <Title>
            <ColorTitle>다른 개발자</ColorTitle>들의 <br></br>
            버그퇴치 방법이 궁금하신가요?
          </Title>
        </Container80>
        <DropDownContainer>
          <DropDownButton>
            <Stack>
              전체게시글
              <img
                src={PolyGon}
                style={{ width: "1vw", height: "1vw", marginLeft: "0.35vw" }}
              />
            </Stack>
          </DropDownButton>
        </DropDownContainer>
        {data.map((article, index) => (
          <Post key={index}>
            <PostTitle>{article.title}</PostTitle>
            <PostContainer>
              {article.tagList.map((tag, tagIndex) => (
                <Tag key={tagIndex} name={tag.tagName} color={tag.colorCode} />
              ))}
            </PostContainer>
          </Post>
        ))}
        <Page>&lt; 2/5 &gt;</Page>
      </Container>
    </>
  );
}

export default AllPost;
