import React, {useRef} from "react";
import styled from "styled-components";
import { Grid, Image, Text, Button, Input } from "../elements";
import {actionCreators as postActions} from "../redux/modules/post";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const PostWrite = (props) => {
  const user_nick = useSelector((state) => state.user.nick_name);
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const [text, setTest] = React.useState("");

  const addPost = () => {
    if(text===""){
      window.alert("칸을 채워주세요!")
      return;
    }
    dispatch(postActions.addPostDB(text, data.post.list));
    setTest("");
  }

  return (
    <React.Fragment>
      <WriteForm>
        <Grid is_flex padding="16px" width="100%" left>
          <Grid width="20%" padding="16px">
            <Grid is_flex>
              <Image circle size="70"></Image>
            </Grid>
            <nickName>{user_nick}</nickName>
          </Grid>
          <Grid width="80%">
            <Input value={text} _onChange={(e)=>{setTest(e.target.value)}} multiLine />
          </Grid>
        </Grid>
        <Grid right padding="0px 16px 16px 0px">
          <Button
          _onClick={addPost}
          width="100px" margin="0px 2px 0px 2px">
            작성하기
          </Button>
        </Grid>
      </WriteForm>
    </React.Fragment>
  );
};

const nickName = styled.span`
  display: inline-block;
`;

const WriteForm = styled.div`
  box-sizing: border-box;
  border: 1px solid #f7f9f9;
  background-color: #ffffff;
  margin-bottom: 20px;
`;

export default PostWrite;
