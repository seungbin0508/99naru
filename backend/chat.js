const socketIo = require("socket.io");
const server = require('./backend/index')
const io = socketIo(server);

const currentOn = [];
io.on("connection", (socket) => {
  const currentDate = JSON.stringify(new Date());

  socket.on("join", ({ token }) => {
    //res.locals; //미들웨어에서 토큰으로 체크하고 유저정보 받아오기

    if (currentOn.indexOf(nickname) == -1) {
      currentOn.push(nickname);
      socket.emit("enterUser", `${nickname}님이 입장하셨습니다.`);
      io.emit("currentOn", currentOn); // 현재 접속자 리스트 업데이트
    }
  });

  //메세지 주고받기
  socket.on("sendMsg", (data) => {
    const message = {
      sendMsg: data.message,
      nickname: data.user.nickname,
      date: currentDate,
    };
    io.emit("receiveMsg", message);
  });

  // 게시물 포스팅 알람
  socket.on("posting", (giveNickname) => {
    const post = {
      nickname: giveNickname,
      date: currentDate,
    };
    io.emit("postNotification", post);
  });

  //댓글 작성 알람
  socket.on("writingComment", (post, comment) => {
      const postUser = {
          nickname = post.nickname
      };
      const commentUser = {
        comment = comment.comment,  
        nickname = comment.nickname,
        date: currentDate
      };
      socketid = sds;
      socket.broadcast.to(socketid).emit("commentNotification", postUser, commentUser) //특정 socketid에게만 전송
  });

  //로그아웃 했을경우
  socket.on("signOut", (token) => {
    currentOn.splice(currentOn.indexOf(nickname), 1);
    io.emit("currentOn", currentOn); // 현재 접속자 리스트 업데이트
    io.emit("exitUser", `${nickname}님이 나가셨습니다.`);
  });

  socket.on("disconnect", () => {});
});
