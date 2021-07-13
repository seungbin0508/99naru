import { io } from './index.js'
import jwt from 'jsonwebtoken'
import User from './models/user.js'
require('dotenv').config()


const currentOn = [];
const currentOnUserInfo=[];

io.on("connection", (socket) => {
  const currentDate = JSON.stringify(new Date());
  io.emit('currentOn', currentOn); // (현재 접속자 리스트) 게시물 업데이트때문에 refresh 할일이 많아서 처음에 넣어줌.
                                  
  socket.on("join", ({ token }) => {
    if (token === null) {
      return;
    }
    const { userId } = jwt.verify(token, process.env.SECRET_KEY);
    
    User.findById(userId)
    .then((user) => {
      const userInfo = user
      const userSocketId = {      // 특정 닉네임에게만 보내는 이벤트를 위한 socket.id저장
        nickname : userInfo.nickname,
        socketId : socket.id
      } 
      
      if (currentOn.indexOf(userInfo.nickname) === -1) {  //현재 접속자에 유저아이디가 없으면 추가
        currentOn.push(userInfo.nickname);
        currentOnUserInfo.push(userSocketId);
        io.emit('enterUser', userInfo.nickname);
        io.emit('currentOn', currentOn); // 현재 접속자 리스트 업데이트
      
      }else{                      // refresh 할때마다 socket.id가 바뀌므로 같이 업데이트 해주는작업
        for (let i in currentOnUserInfo){ 
          if (currentOnUserInfo[i].nickname === userInfo.nickname){
            currentOnUserInfo[i].socketId = userSocketId.socketId
          }
        }
      }
    });
  });


  //메세지 주고받기(프론트: 보내는 유저info, 보내는 메세지)
  socket.on("sendMsg", (data) => {
    const message = {
      sendMsg: data.message,
      nickname: data.user.nickname,
      date: currentDate,
    };
    io.emit("receiveMsg", message);
  });

  //귓속말(프론트: 보내는 유저info, 보내는 메세지, 받는 유저info)
  socket.on("writingComment", (send, receive) => {
    const sendUser = {
        nickname : send.nickname,
        sendMessage: send.message,
        date: currentDate
    };
    for (let i in currentOnUserInfo){
      if (currentOnUserInfo[i].nickname === receive.nickname){
        const socketId = currentOnUserInfo[i].socketId;
        socket.broadcast.to(socketId).emit("whisper", sendUser) //특정 socketid에게만 전송
      }
    }
  });

  // 게시물 포스팅 알람(프론트: 게시물 작성한 유저info)
  socket.on("posting", (giveNickname) => {
    const post = {
      nickname: giveNickname,
      date: currentDate,
    };
    io.emit("postNotification", post);
  });

  //댓글 작성 알람(프론트: 댓글 단 유저info, 댓글내용, 해당 게시물 유저info)
  socket.on("writingComment", (post, comment) => {
      const postUser = {
          nickname : post.nickname
      };
      const commentUser = {
        comment : comment.comment,  
        nickname : comment.nickname,
        date: currentDate
      };
      for (let i in currentOnUserInfo){
        if (currentOnUserInfo[i].nickname === receive.nickname){
          const socketId = currentOnUserInfo[i].socketId;
          socket.broadcast.to(socketId).emit("commentNotification", postUser, commentUser) //특정 socketid에게만 전송
      }
    }
  });

  //로그아웃 했을경우
  socket.on('signOut', (token) => {
    if (token === null) {
      return;
    }
    const { userId } = jwt.verify(token, process.env.SECRET_KEY);
    
    User.findById(userId)
    .then((user) => {
      const userInfo = user;
      
      // 현재 접속중 배열에서 제거
      currentOn.splice(currentOn.indexOf(userInfo.nickname), 1);

      // 현재 socket.id랑 연결되어있는 닉네임이 있는 배열에서 제거
      for (let i in currentOnUserInfo){
        if (currentOnUserInfo[i].nickname === userInfo.nickname){
          currentOnUserInfo.splice(i,1)
        }
      }
      io.emit('exitUser', userInfo.nickname);
      });
  });

  socket.on("disconnect", () => {
    console.log('나감');    // todo 브라우저를 끄거나 탭을 닫으면 disconnect 작동하는지 검사
  });
});                                  




