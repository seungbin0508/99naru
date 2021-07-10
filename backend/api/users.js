import express from 'express'
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import authMiddleware from '../middlewares/auth-middleware'
import User from '../models/user.js'
const router = express.Router()

const postUserschema = Joi.object({
    nickname: Joi.string()
      .regex(/^[a-zA-Z0-9]/)
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

  });

router.post("/", async (req, res) => {
try {
    const { loginId, nickname, password } =
    await postUserschema.validateAsync(req.body);

    const { passwordconfirm, intro }

    if (password !== passwordconfirm) {
        res.status(400).send({errorMessage: '비밀번호가 일치하지 않습니다.'})
        return;
    } 

    const existUser = await User.find({
    $and: [{ $or: [{ nickname }, { loginId }] }],
    });
    if (existUser.length) {
        return res.status(400).send({errorMessage: '이미 가입된 닉네임 혹은 아이디입니다.'})
    }

    await User.create({ loginId, nickname, password, intro});
    return res.status(201).send({message: '회원가입을 축하합니다.'})
} catch (err) {
	//todo 여기서 err의 message만 따로 뺀 이유는 무엇인가요?
    const error = err.message;
    console.log(error);
    res.status(400).send({message: '회원가입 양식이 올바르지 않습니다.'})
}
});

export default router