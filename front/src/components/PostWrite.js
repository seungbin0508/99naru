import React from "react";
import styled from "styled-components";
import { Grid, Image, Text, Button, Input } from "../elements";
import {actionCreators as postActions} from "../redux/modules/post";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const PostWrite = (props) => {
  const user_nick = useSelector((state) => state.user.nick_name);
  const dispatch = useDispatch();
  const [addPost, setPost] = React.useState("");
  const [modifypost, setModify] = React.useState("");
  const _addpost = () => {
    console.log(addPost)
    // dispatch(postActions.addPostDB(addPost))
    axios
      .post("http://localhost:3000/api/posts",
      {text: `${addPost}`,},
      {headers : {'Authorization': `Bearer ${sessionStorage.getItem("MY_SESSION")}`}}
      )
      .then((res) => {
        console.log(res)
      });
      window.location.reload()
    
  }


  return (
    <React.Fragment>
      <WriteForm>
        <Grid is_flex padding="16px">
          <Grid width="20%" padding="16px">
            <Image circle size="70"></Image>
            <div>{user_nick}</div>
          </Grid>
          <Grid width="80%">
            <Input _onChange={(e)=>{setPost(e.target.value)}} multiLine />
          </Grid>
        </Grid>
        <Grid right padding="0px 16px 16px 0px">
          <Button 
          _onClick={_addpost}
          width="100px" margin="0px 2px 0px 2px">
            작성하기
          </Button>
        </Grid>
      </WriteForm>
    </React.Fragment>
  );
};

const WriteForm = styled.div`
  box-sizing: border-box;
  border: 1px solid #f7f9f9;
  background-color: #ffffff;
  margin-bottom: 20px;
`;

export default PostWrite;
