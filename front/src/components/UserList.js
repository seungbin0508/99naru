import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Text, Image, Grid } from "../elements";
import { Wrapper } from "../elements";
import io from "socket.io-client";
import jwt_decode from "jwt-decode";

const UserList = (props) => {
  const token = sessionStorage.getItem("MY_SESSION");
  const decoded = jwt_decode(token);
  const nickname = decoded.nickname;
  const [currentOn, setCurrentOn] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://13.209.13.200");
    socketRef.current.emit("join", { nickname });
    socketRef.current.on("currentOn", (currentOn) => {
      setCurrentOn(currentOn);
    });
    return () => socketRef.current.disconnect();
  }, []);

  const showCurrentOn = (props) => {
    if (!currentOn.length) {
      return <div>로딩 중...</div>;
    }
    return currentOn.map((current, index) => (
      <Wrapper>
        <Grid is_flex>
            <Grid is_flex left key={index}>
              <Image shape="circle" />
              <Text>{current}</Text>
            </Grid>
          <Grid width="0%"></Grid>
        </Grid>
      </Wrapper>
    ));
  };
  const emptyspace = () => {
    return (null);
  };
  return (
    <Container>
      <ChattingMode>Users</ChattingMode>
      <UserWrap>
        {emptyspace()}
        {showCurrentOn()}
      </UserWrap>
    </Container>
  );
};

// 유저바 전체 레이아웃
const Container = styled.div`
  border: 3px solid #f7f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 30%;
  height: 100%;
  box-sizing: border-box;
`;

// 유저바 상단
const ChattingMode = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 10%;
  box-sizing: border-box;
  padding: 20px;
  font-size: 24px;
  font-weight: 700;
  background-color: #ffffff;
`;

// 유저바 내용 레이아웃
const UserWrap = styled.div`
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 30px 30px 60px;
  overflow-x: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

// 유저바 입력창
const ChattingInput = styled.input`
  background-color: #ffffff;
  border: none;
  width: 90%;
  margin-left: 10px;
  padding: 12px 4px;
  box-sizing: border-box;
  font-size: 18px;
`;

export default UserList;
