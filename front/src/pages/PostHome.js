import React from "react";
import styled from "styled-components";
import PostWrite from "../components/PostWrite";
import PostList from "../components/PostList";
import Header from "../components/Header";
import Posts from "../components/Posts"
import jwt_decode from "jwt-decode"; // install jwt-decode for token decode

import {useSelector, useDispatch} from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post";


const PostHome = (props) => {
  const token = sessionStorage.getItem("MY_SESSION");
  const post_list = useSelector((state) => state.post.list);

  const decoded = jwt_decode(token);
  const nickname = decoded.nickname
  const user_id = decoded.userId
  console.log(nickname)
  console.log(user_id)

  return (
    <React.Fragment>
      <MainWrap>
        <Header>99NARU</Header>
        <Container>
          <PostWrite />
          {post_list.length !== 0 ? post_list.map((p, idx) => {
            return <Posts key={idx} post_data={p}/>
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
`;

export default PostHome;
