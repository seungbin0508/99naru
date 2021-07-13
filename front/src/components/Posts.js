import React from "react";
import styled from "styled-components";
import { Grid, Image, Text, Button, Input } from "../elements";
import CommentWrite from "./CommentWrite";
import CommentList from "./CommentList";
import {
  IoChatbubbleEllipsesOutline,
  IoChatbubbleEllipsesSharp,
  IoThumbsUpOutline,
  IoThumbsUpSharp,
  IoTrash,
  IoSettingsOutline,
} from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import axios from "axios";

const PostList = (props) => {
  console.log(props.post_data.likedUsers.length)
  const [show, setShow] = React.useState(false);
  const [showComment, setShowComment] = React.useState(false);
  const [editPost, setEdit] = React.useState("");
  const show_edit_cnt = () => {setShowComment(true)};
  const hide_edit_cnt = () => {setShowComment(false)};
  const show_edit = () => {setShow(true)};
  const hide_edit = () => {setShow(false)};
  const user_info_id = useSelector((state) => state.user.user_id);
  const post_user_id = props.post_data.userId._id
  const post_id = props.post_data._id
  const comments = props.post_data.comments
  console.log(comments)
  console.log(post_id)
  const modifyPost = () => {
    if (editPost===""){
        window.alert("칸 채워주세요!")
        return;
    }
    axios
    .put(`http://localhost:3000/api/posts/${post_id}`, {
        text: `${editPost}`,
    },{headers : {'Authorization': `Bearer ${sessionStorage.getItem("MY_SESSION")}`}})
    .then((res) => {
      console.log(res)
    });
    // dispatch(postActions.getpostDB());
    window.location.reload()
    console.log(props)
}

  const deletePost = () => {
  axios
    .delete(`http://localhost:3000/api/posts/${props.post_data._id}`,
    {headers : {'Authorization': `Bearer ${sessionStorage.getItem("MY_SESSION")}`}}
  ).then((response) => {
    console.log(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
    window.location.reload();
  }
  return (
    <React.Fragment>
      <PostView>
        <Grid is_flex padding="16px 16px 0px 16px" width="100%">
          <Grid is_flex width="100%" left>
            <Image shape="circle" src={props.src} />
            <Text bold>{props.post_data.userId.nickname}</Text>
          </Grid>
          <Grid is_flex width="100%">
            <Grid is_flex width="100%">
              <Grid right>
                <Text>{props.post_data.created_at.split('T')[0]}</Text>
              </Grid>
              {post_user_id===user_info_id ? 
              <Grid is_flex width="100" left padding="0px 10px">
              <IconWrap>
                {show ? <IoSettingsOutline onClick={hide_edit} />:<IoSettingsOutline onClick={show_edit} />}

              </IconWrap>
              <IconWrap>
                <IoTrash onClick={deletePost} />
              </IconWrap>
            </Grid>
              :<div></div> }
            </Grid>
          </Grid>
        </Grid>
        <Grid padding="16px" is_flex>
          {/* <Grid width="10%"></Grid> */}
          <Grid width="100%" bg="#F7F9F9" padding="8px">
            
            {show ? 
            <div>
              <Input _onChange={(e) => {setEdit(e.target.value)}} placeholder="게시글 수정 중.." multiLine>
              </Input>
            <Button width="15%" _onClick={modifyPost}>
              수정
              </Button>
            </div>
            :
            <Text padding="5px 10px" size="18px">
            {props.post_data.text}
          </Text>
            }

          </Grid>
        </Grid>
        <Grid is_flex padding="0px 26px" width="100%">
          <Grid is_flex width="100%" left>
            <Grid>
              <IconThumbWrap>
                <IconClickSpan>
                  <IoThumbsUpOutline /> {props.post_data.likedUsers.length}
                </IconClickSpan>
              </IconThumbWrap>
            </Grid>
            {/* <Grid>
              <LikeNumber>1</LikeNumber>
            </Grid> */}
          </Grid>
          <IconWrap>
            <IconClickSpan>
             {showComment ? 
             <IoChatbubbleEllipsesSharp onClick={hide_edit_cnt} />
             :
             <IoChatbubbleEllipsesSharp onClick={show_edit_cnt}/> } 
              
            </IconClickSpan>{props.post_data.comments.length}
          </IconWrap>
        </Grid>
      {showComment ? 
        <Grid>
        {comments.map((p, idx) => {
            return <CommentList key={idx} comments={p} post_info={props}></CommentList>
          })}
          <CommentWrite post_id={post_id}></CommentWrite>
        </Grid> 
    :<div></div>}


      </PostView>
    </React.Fragment>
  );
};

const PostView = styled.div`
  box-sizing: border-box;
  border: 1px solid #f7f9f9;
  background-color: #ffffff;
  margin-bottom: 10px;
`;

const IconWrap = styled.div`
  width: 100%;
  /* padding: 0px 0rem; */
  /* margin: 2rem 0px; */
  text-align: right;
  font-size: 2rem;
  color: #1da1f2;
`;

const IconThumbWrap = styled.div`
  width: 100%;
  /* padding: 0px 0rem; */
  /* margin: 2rem 0px; */
  text-align: left;
  font-size: 2rem;
  color: #1da1f2;
`;

const LikeNumber = styled.div`
  font-size: 25px;
  font-weight: 600;
`;

const IconClickSpan = styled.span`
  cursor: pointer;
`;

export default PostList;
