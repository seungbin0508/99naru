import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Text, Image, Grid } from "../elements";
import io from "socket.io-client";
import jwt_decode from "jwt-decode";

const ChattingBar = (props) => {
  const token = sessionStorage.getItem("MY_SESSION");
  const decoded = jwt_decode(token);
  const nickname = decoded.nickname;
  let date = new Date().toLocaleTimeString();

  const [state, setState] = useState({
    message: "",
    nickname: nickname,
    date: date,
  });
  const [chat, setChat] = useState([]);
  const [chats, setChats] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://13.209.13.200");
    socketRef.current.on("chatLog", (chats) => {
      setChats([...chats, { chats }]);
    });
    socketRef.current.on("receiveMsg", ({ nickname, message, date }) => {
      setChat([...chat, { nickname, message, date }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    let date = new Date().toLocaleTimeString();
    const { message, nickname } = state;
    socketRef.current.emit("sendMsg", { message, nickname, date });
    e.preventDefault();
    setState({ message: "", nickname: nickname, date: date });
  };

  const showChatLog = () => {
    if (!chats.length) {
      return <div>로딩 중...</div>;
    }
    return chats.map((chatting, index) => (
      <MessageWrap key={index}>
        <ImageWrap>
          <Image shape="circle" />
        </ImageWrap>
        <SenderWrap>
          <SenderNameSpan>{chatting.nickname}</SenderNameSpan>
          <ElMessage>{chatting.message}</ElMessage>
          <SenderTimeSpan>{chatting.date}</SenderTimeSpan>
        </SenderWrap>
      </MessageWrap>
    ));
  };

  return (
    <Container>
      <ChattingMode>Chat</ChattingMode>
      <ChattingList>{showChatLog()}</ChattingList>
      <ChattingInputBox>
        <form onSubmit={onMessageSubmit}>
          <ChattingInput
            placeholder="메세지를 작성 후 엔터를 눌러주세요"
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            label="Message"
          />
        </form>
      </ChattingInputBox>
    </Container>
  );
};

const MessageWrap = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: auto;
  margin: 0px 0px 25px 0px;
  background-color: #f7f9f9;
  border-radius: 20px;
  border: 1px solid whitesmoke;
`;

const ElMessage = styled.span`
  display: inline-block;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #212121;
  margin-right: 5px;
  padding: 15px;
  width: auto;
  height: auto;
  border-radius: 20px;
`;

const SenderWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  color: #212121;
`;

const SenderNameSpan = styled.span`
  min-width: 50px;
  width: 100%;
  text-align: left;
  margin: 5px 0px;
  font-weight: 600;
`;

const SenderTimeSpan = styled.span`
  min-width: 50px;
  width: 100%;
  text-align: left;
  margin: 2px 0px;
  color: #adb5bd;
  font-size: 12px;
`;

const ImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: 130%;
  margin: 5px;
`;

// 채팅바 전체 레이아웃
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

// 채팅바 상단
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

// 채팅바 내용 레이아웃
const ChattingList = styled.div`
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 30px 20px 0px;
  overflow-x: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

// 채팅바 입력창 레이아웃
const ChattingInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: #f5f5f5;
  justify-content: center;
  width: 100%;
  height: 8%;
  opacity: 0.5;
`;

// 채팅 입력창
const ChattingInput = styled.input`
  background-color: #ffffff;
  border: 1px solid #1da1f2;
  width: 100%;
  padding: 12px 15px;
  box-sizing: border-box;
  font-size: 18px;
  border-radius: 20px;
  ::placeholder {
    color: #212121;
    font-size: 15px;
    text-align: center;
  }
  :focus {
    outline: none;
    border: 2px solid #1da1f2;
  }
`;

export default ChattingBar;
