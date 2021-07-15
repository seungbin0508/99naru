import React from "react";
import styled from "styled-components";
import PostWrite from "../components/PostWrite";
import Header from "../components/Header";
import Posts from "../components/Posts"
import {useSelector} from "react-redux";

const PostHome = (props) => {
  const post_list = useSelector((state) => state.post.list);

  return (
    <React.Fragment>
      <MainWrap>
        <Header>99NARU</Header>
        <Container>
          <PostWrite />
          {post_list.length !== 0 ? post_list.map((p, idx) => {
            return <Posts key={p._id} post_data={p}/>
          }) : []}
        </Container>
      </MainWrap>
    </React.Fragment>
  );
};

const MainWrap = styled.div`
  border: 1px solid #f7f9f9;
  background-color: #ffffff;
  width: 80%;
  /* height: 100vh; */
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  border: 2px solid #f7f9f9;
  background-color: #f7f9f9;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export default PostHome;
