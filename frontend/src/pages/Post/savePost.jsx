import styled from "styled-components";
import PolyGon from "../../img/Polygon.png";
import Tag from "../../components/tag";

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

function SavePost() {
  const postData = [
    { tags: [{ name: "Swift", color: "#6630ff" }] },
    {
      tags: [
        { name: "Swift", color: "#6630ff" },
        { name: "Ios", color: "#FF3F3F" },
      ],
    },
    { tags: [{ name: "Java", color: "#00A775" }] },
    { tags: [{ name: "Swift", color: "#6630ff" }] },
    {
      tags: [
        { name: "Java", color: "#00A775" },
        { name: "Ios", color: "#FF3F3F" },
      ],
    },
  ];

  return (
    <Container>
      <Container80>
        <Title>
          <ColorTitle>버그퇴치 방법</ColorTitle>을<br></br>
          한번 더 보고싶어요!
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
      {postData.map((post, index) => (
        <Post key={index}>
          <PostTitle>Index out of range</PostTitle>
          <PostContainer>
            {post.tags.map((tag, tagIndex) => (
              <Tag key={tagIndex} name={tag.name} color={tag.color} />
            ))}
          </PostContainer>
        </Post>
      ))}
      <Page>&lt; 2/5 &gt;</Page>
    </Container>
  );
}

export default SavePost;
