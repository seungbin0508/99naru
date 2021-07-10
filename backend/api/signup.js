import express from "express";
import Joi from 'joi'
import User from '../models/user.js'
const router = express.Router();

const postUserschema = Joi.object({
  nickname: Joi.string()
    .regex(/^[가-힣a-zA-Z0-9]/)
    .min(3)
    .required(),
  loginId: Joi.string()
    .regex(/^[a-zA-Z0-9]/)
    .min(3)
    .required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]/)
    .min(6)
    .required(),
  intro: Joi.string().min(3).required(),
});
// 회원가입 검사 및 등록
router.post("/", async (req, res) => {
  try {
    const { loginId, nickname, password, intro } =
      await postUserschema.validateAsync(req.body);
    const { passwordconfirm } = req.body;
    if (password !== passwordconfirm) {
      res.status(400).send({ errorMessage: "비밀번호가 일치하지 않습니다." });
      return;
    }
    await User.create({
      loginId,
      nickname,
      password,
      intro,
    });
    return res.status(201).send({ message: "회원가입을 축하합니다." })
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .send({ errorMessage: "회원가입 양식이 올바르지 않습니다." });
  }
});
export default router;
