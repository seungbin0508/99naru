const socketIo = require("socket.io");
const server = require('./backend/index')
const io = socketIo(server);
const jwt = require('jsonwebtoken');
const User = require('./models/user');

const currentOn = [];

io.on("connection", (socket) => {
  const currentDate = JSON.stringify(new Date());
  io.emit('currentOn', currentOn); // (현재 접속자 리스트) 게시물 업데이트때문에 refresh 할일이 많아서 처음에 넣어줌.
                                  
  socket.on("join", ({ token }) => {
    if (token === null) {
      return;
    }
    const { userId } = jwt.verify(token, '키');
    
    User.findById(userId)
    .then((user) => {
      const userInfo = user 

      if (currentOn.indexOf(userInfo.nickname) === -1) {  //유저아이디가 있으면 현재인원에추가안해줘도 됌
        currentOn.push(userInfo.nickname);
        io.emit('enterUser', userInfo.nickname);
        io.emit('currentOn', currentOn); // 현재 접속자 리스트
      };
    });
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
          nickname : post.nickname
      };
      const commentUser = {
        comment : comment.comment,  
        nickname : comment.nickname,
        date: currentDate
      };
      // socketid = 찾기;
      socket.broadcast.to(socketid).emit("commentNotification", postUser, commentUser) //특정 socketid에게만 전송
  });

  //로그아웃 했을경우
  socket.on('signOut', (token) => {
    if (token === null) {
      return;
    }
    const { userId } = jwt.verify(token, '키');
    
    User.findById(userId)
    .then((user) => {
      const userInfo = user;

      currentOn.splice(currentOn.indexOf(userInfo.nickname), 1);
      io.emit('exitUser', userInfo.nickname);
      });
  });

  socket.on("disconnect", () => {});// disconnect할때 해당 socket.id가 사라지는지 검사
});                                  // 만약 그게 사라진다면 유저아이디랑 연결된 id 없애면 됌.


export default io

