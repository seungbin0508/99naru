import express from "express";
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const router = express.Router();

// 회원가입 검사 및 등록
router.post("/", async (req, res) => {
  try {
    const { loginId, password } = req.body;
    const user = await User.findOne({
      loginId,
      password,
    });
    if (!user) {
      res.status(400).send({
        errorMessage: "이메일 또는 패스워드가 잘못됐습니다.",
      });
      return;
    }
    // 토큰 생성
    const userInfo = { userId: user._id, nickname: user.nickname };
    const options = {
      expiresIn: "5m",
    };
    const token = jwt.sign(userInfo, process.env.SECRET_KEY, options);
    res.send({ token })
  } catch (err) {
    console.error(err);
    res.status(400).send({
      errorMessage: "이메일 또는 패스워드가 잘못됐습니다.",
    });
  }
});
export default router;
