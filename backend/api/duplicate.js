import express from "express";
import User from '../models/user.js'

const router = express.Router();

//   loginId, nickname 회원가입 중복체크
router.post("/", async (req, res) => {
  const { loginId, nickname } = req.body;
  const existUser = await User.find({
    $and: [{ $or: [{ nickname }, { loginId }] }],
  });
  if (existUser.length) {
    res.status(400).send(false);
  } else {
    res.status(200).send(true);
  }
});

export default router;
