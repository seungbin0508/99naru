import React from "react";
import styled from "styled-components";
import { Grid, Image, Text } from "../elements";

import {
  IoChatbubbleEllipsesOutline,
  IoChatbubbleEllipsesSharp,
  IoThumbsUpOutline,
  IoThumbsUpSharp,
  IoTrash,
  IoSettingsOutline,
} from "react-icons/io5";

const CommentList = (props) => {
  console.log(props.post_info)
  console.log(props.comments)
  return (
    <Grid is_flex padding="0px 16px 0px 16px">
      <Grid center is_flex width="20%">
        <Image shape="circle" />
        <Text bold>닉네임</Text>
      </Grid>
      <Grid is_flex margin="0px 4px">
        <Grid width="70%">
          <Text margin="0px 0px 0px 5px">
            {props.comments.text}
          </Text>
        </Grid>
        <Grid is_flex width="100%">
          <Grid right>
            <Text>{props.comments.created_at.split("T")[0]}</Text>
          </Grid>
          <Grid is_flex width="100" padding="0px 10px">
            <IconWrap>
              <IoChatbubbleEllipsesOutline />
            </IconWrap>
            <IconWrap>
              <IoSettingsOutline />
            </IconWrap>
            <IconWrap>
              <IoTrash />
            </IconWrap>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const IconWrap = styled.div`
  width: 100%;
  /* padding: 0px 0rem; */
  /* margin: 2rem 0px; */
  text-align: right;
  font-size: 2rem;
  color: #1da1f2;
  cursor: pointer;
`;

export default CommentList;
