import React from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import {useSelector} from "react-redux";

function Main() {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state)
  
  React.useEffect(() => {
  dispatch(postActions.getPostDB)
  console.log(post_list)
}, []);


  return (
    
    <div>
      <div>
        <Header></Header>
        </div>
    <Div style={{marginTop: '0px'}}>
      <Div>

   <Grid2>
     <Contents>홈</Contents>
     <Contents>내정보</Contents>
     <Contents>로그아웃</Contents>
   </Grid2>

   <Grid>
   <Grid2>
     <Post_Write>게시글 작성</Post_Write>
     <Post_Write>게시글1</Post_Write>
     <Post_Write>게시글2</Post_Write>
   </Grid2>
   </Grid>
   
   <Grid3>
   <Chatting>chatting</Chatting>
     <Input>input</Input>
   </Grid3>

    </Div>
    </Div>
    </div>
  );
}

export default Main;

const Header = styled.div`
background-color : #FFC5D0	;
width : 1090px;
height : 50px;
position: fixed;
margin : 0px 0px 0px 160px;
`;

const Grid = styled.div`
  background-color : #eee;
  width : 650px;
  height : 1200px;
  display : flex;
  margin : 10px;
  margin-top : 50px;
`;

const Grid2 = styled.div`
  background-color : #eee;
  width : 100px;
  display : flex;
  flex-direction: column;
  margin : 10px;
  margin-top : 50px;
`;

const Grid3 = styled.div`
  background-color : #eee;
  width : 300px;
  height : 1200px;
  display : flex;
  flex-direction: column;
  margin : 10px;
  margin-top : 50px;
`;

const Div = styled.div`
  display : flex;
  margin : auto;
`;

const Contents = styled.div`
  width : 50px;
  height : 50px;
  margin : 20px;
  background-color : #B2FA5C;
`;

const Post_Write = styled.div`
  background-color : #B2FA5C;
  width : 600px;
  height : 200px;
  margin : 10px;
`;



const Chatting = styled.div`
background-color : #B2FA5C;
width : 250px;
height : 1200px;
margin : 20px auto 0px auto;
`;

const Input = styled.div`
background-color : #B2FA5C;
width : 250px;
height : 60px;
margin : 20px auto 20px auto;
`;